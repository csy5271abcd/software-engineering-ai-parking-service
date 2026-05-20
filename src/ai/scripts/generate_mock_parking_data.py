# SmartPark AI 혼잡도 분석 전 단계에서 사용할 raw Mock CSV 3종을 생성한다.
# 대용량 parking_usage_history.csv는 주차장 chunk 단위로 생성해 메모리 사용을 제한한다.

from __future__ import annotations

import random
from datetime import date, datetime, timedelta
from pathlib import Path

import numpy as np
import pandas as pd


NUM_PARKING_LOTS = 1000
YEARS_OF_HISTORY = 5
RANDOM_SEED = 42
CHUNK_SIZE_PARKING_LOTS = 50
TEST_MODE = False

if TEST_MODE:
    NUM_PARKING_LOTS = 30
    YEARS_OF_HISTORY = 1
    CHUNK_SIZE_PARKING_LOTS = 10

ENCODING = "utf-8-sig"

PARKING_LOT_COLUMNS = [
    "parking_lot_id",
    "name",
    "district",
    "address",
    "latitude",
    "longitude",
    "nearby_place",
    "nearby_poi_type",
    "total_spaces",
    "price_per_hour",
    "parking_type",
    "is_public",
    "is_shared",
    "has_nfc",
    "operation_start_hour",
    "operation_end_hour",
]

EXTERNAL_FACTOR_COLUMNS = [
    "factor_id",
    "district",
    "date",
    "hour",
    "weather",
    "temperature",
    "rainfall_mm",
    "event_nearby",
    "event_name",
    "event_scale",
    "traffic_level",
    "season",
]

USAGE_HISTORY_COLUMNS = [
    "record_id",
    "parking_lot_id",
    "date",
    "year",
    "month",
    "day",
    "day_of_week",
    "hour",
    "time_slot",
    "is_weekend",
    "is_holiday",
    "occupied_spaces",
    "available_spaces",
    "reserved_spaces",
    "soon_available_spaces",
    "occupancy_rate",
    "turnover_rate",
]

DISTRICT_CENTERS = {
    "성동구": (37.5633, 127.0369),
    "강남구": (37.5172, 127.0473),
    "마포구": (37.5663, 126.9019),
    "종로구": (37.5735, 126.9790),
    "중구": (37.5636, 126.9976),
    "송파구": (37.5145, 127.1059),
    "서초구": (37.4837, 127.0324),
    "용산구": (37.5326, 126.9905),
    "영등포구": (37.5264, 126.8962),
    "광진구": (37.5384, 127.0823),
    "서대문구": (37.5791, 126.9368),
    "동작구": (37.5124, 126.9393),
    "관악구": (37.4784, 126.9516),
    "강서구": (37.5509, 126.8495),
    "노원구": (37.6542, 127.0568),
}

DISTRICT_PLACES = {
    "성동구": ["성수역", "서울숲", "왕십리역"],
    "강남구": ["강남역", "선릉역", "코엑스"],
    "마포구": ["홍대입구역", "합정역", "상암DMC"],
    "종로구": ["종로3가역", "광화문", "혜화역"],
    "중구": ["서울역", "명동", "동대문역사문화공원"],
    "송파구": ["잠실역", "올림픽공원", "문정역"],
    "서초구": ["고속터미널역", "교대역", "양재역"],
    "용산구": ["용산역", "이태원역", "한남동"],
    "영등포구": ["여의도역", "영등포역", "국회의사당"],
    "광진구": ["건대입구역", "어린이대공원", "구의역"],
    "서대문구": ["신촌역", "연세대학교", "독립문역"],
    "동작구": ["노량진역", "사당역", "숭실대입구역"],
    "관악구": ["서울대입구역", "신림역", "낙성대역"],
    "강서구": ["김포공항역", "마곡나루역", "발산역"],
    "노원구": ["노원역", "광운대역", "태릉입구역"],
}

POI_TYPES = ["station", "office", "shopping", "hospital", "university", "residential", "event_venue"]
PARKING_TYPES = ["PUBLIC", "PRIVATE", "SHARED", "COMMERCIAL"]
DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
WEATHER_TYPES = ["CLEAR", "CLOUDY", "RAIN", "SNOW"]
EVENT_NAMES = ["콘서트", "전시회", "야구 경기", "축제", "컨퍼런스", "대학 행사", "지역 장터"]


def get_project_paths() -> tuple[Path, Path]:
    """현재 실행 위치와 무관하게 src/ai 루트와 data/raw 경로를 계산한다."""
    project_root = Path(__file__).resolve().parents[1]
    raw_data_dir = project_root / "data" / "raw"
    return project_root, raw_data_dir


def set_random_seed() -> None:
    random.seed(RANDOM_SEED)
    np.random.seed(RANDOM_SEED)


def get_date_range(years_of_history: int) -> tuple[date, date]:
    end_date = date.today()
    start_date = (pd.Timestamp(end_date) - pd.DateOffset(years=years_of_history) + pd.DateOffset(days=1)).date()
    return start_date, end_date


def get_time_slot(hour: int) -> str:
    if 0 <= hour <= 5:
        return "dawn"
    if 6 <= hour <= 10:
        return "morning"
    if 11 <= hour <= 13:
        return "lunch"
    if 14 <= hour <= 17:
        return "afternoon"
    if 18 <= hour <= 21:
        return "evening"
    return "night"


def get_season(month: int) -> str:
    if 3 <= month <= 5:
        return "spring"
    if 6 <= month <= 8:
        return "summer"
    if 9 <= month <= 11:
        return "fall"
    return "winter"


def clamp(value: float, min_value: float, max_value: float) -> float:
    return max(min_value, min(value, max_value))


def get_mock_holidays(start_date: date, end_date: date) -> set[str]:
    fixed_holidays = {(1, 1), (3, 1), (5, 5), (6, 6), (8, 15), (10, 3), (10, 9), (12, 25)}
    holidays: set[str] = set()
    for current in pd.date_range(start_date, end_date, freq="D"):
        current_date = current.date()
        if (current_date.month, current_date.day) in fixed_holidays:
            holidays.add(current_date.isoformat())
        # Mock 명절/대체 휴일 효과를 위해 매년 일부 날짜를 추가한다.
        if current_date.month in {2, 9} and current_date.day in {10, 11, 12}:
            holidays.add(current_date.isoformat())
    return holidays


def choose_operation_hours(parking_type: str) -> tuple[int, int]:
    if parking_type == "PUBLIC":
        return random.choice([(0, 24), (6, 24)])
    if parking_type == "COMMERCIAL":
        return random.choice([(0, 24), (7, 23)])
    if parking_type == "PRIVATE":
        return random.choice([(7, 22), (8, 22)])
    return random.choice([(8, 22), (9, 21), (10, 20)])


def generate_parking_lots() -> pd.DataFrame:
    rows = []
    districts = list(DISTRICT_CENTERS.keys())
    for index in range(1, NUM_PARKING_LOTS + 1):
        district = districts[(index - 1) % len(districts)]
        center_lat, center_lon = DISTRICT_CENTERS[district]
        nearby_place = random.choice(DISTRICT_PLACES[district])
        nearby_poi_type = random.choice(POI_TYPES)
        parking_type = random.choices(PARKING_TYPES, weights=[0.30, 0.20, 0.15, 0.35], k=1)[0]

        if parking_type == "PUBLIC":
            total_spaces = random.randint(80, 250)
        elif parking_type == "COMMERCIAL":
            total_spaces = random.randint(50, 180)
        elif parking_type == "PRIVATE":
            total_spaces = random.randint(10, 60)
        else:
            total_spaces = random.randint(1, 20)

        operation_start_hour, operation_end_hour = choose_operation_hours(parking_type)
        name = f"{district} {nearby_place} {parking_type} 주차장"
        rows.append(
            {
                "parking_lot_id": f"PARK-{index:04d}",
                "name": name,
                "district": district,
                "address": f"서울특별시 {district} Mock로 {random.randint(1, 300)}",
                "latitude": round(center_lat + random.uniform(-0.018, 0.018), 6),
                "longitude": round(center_lon + random.uniform(-0.018, 0.018), 6),
                "nearby_place": nearby_place,
                "nearby_poi_type": nearby_poi_type,
                "total_spaces": total_spaces,
                "price_per_hour": random.randrange(1000, 6001, 500),
                "parking_type": parking_type,
                "is_public": parking_type == "PUBLIC",
                "is_shared": parking_type == "SHARED",
                "has_nfc": random.random() < 0.88,
                "operation_start_hour": operation_start_hour,
                "operation_end_hour": operation_end_hour,
            }
        )
    df = pd.DataFrame(rows, columns=PARKING_LOT_COLUMNS)
    validate_parking_lots(df)
    return df


def generate_external_factors(start_date: date, end_date: date, districts: list[str]) -> pd.DataFrame:
    rows = []
    factor_index = 1
    for current in pd.date_range(start_date, end_date, freq="D"):
        current_date = current.date()
        season = get_season(current_date.month)
        for district in districts:
            district_event_day = random.random() < 0.035
            event_name = random.choice(EVENT_NAMES) if district_event_day else ""
            event_scale = random.choices(["SMALL", "MEDIUM", "LARGE"], weights=[0.55, 0.30, 0.15], k=1)[0] if district_event_day else "NONE"
            event_hours = set(range(random.choice([13, 14, 15, 18]), random.choice([20, 21, 22, 23])))
            for hour in range(24):
                weather = choose_weather(season)
                rainfall_mm = round(random.uniform(0.5, 30.0), 1) if weather == "RAIN" else 0.0
                event_nearby = district_event_day and hour in event_hours
                traffic_level = choose_traffic_level(hour, weather, event_nearby)
                rows.append(
                    {
                        "factor_id": f"EXT-{factor_index:08d}",
                        "district": district,
                        "date": current_date.isoformat(),
                        "hour": hour,
                        "weather": weather,
                        "temperature": generate_temperature(season),
                        "rainfall_mm": rainfall_mm,
                        "event_nearby": event_nearby,
                        "event_name": event_name if event_nearby else "",
                        "event_scale": event_scale if event_nearby else "NONE",
                        "traffic_level": traffic_level,
                        "season": season,
                    }
                )
                factor_index += 1
    df = pd.DataFrame(rows, columns=EXTERNAL_FACTOR_COLUMNS)
    validate_external_factors(df)
    return df


def choose_weather(season: str) -> str:
    if season == "winter":
        return random.choices(WEATHER_TYPES, weights=[0.55, 0.25, 0.08, 0.12], k=1)[0]
    return random.choices(["CLEAR", "CLOUDY", "RAIN"], weights=[0.58, 0.30, 0.12], k=1)[0]


def generate_temperature(season: str) -> float:
    ranges = {
        "spring": (8, 24),
        "summer": (20, 34),
        "fall": (10, 25),
        "winter": (-8, 10),
    }
    low, high = ranges[season]
    return round(random.uniform(low, high), 1)


def choose_traffic_level(hour: int, weather: str, event_nearby: bool) -> str:
    score = 0.2
    if 7 <= hour <= 9 or 18 <= hour <= 20:
        score += 0.35
    if weather in {"RAIN", "SNOW"}:
        score += 0.20
    if event_nearby:
        score += 0.30
    if score >= 0.70:
        return "HIGH"
    if score >= 0.40:
        return "MEDIUM"
    return "LOW"


def calculate_base_occupancy(
    parking_lot_row: pd.Series,
    external_factor_row: pd.Series,
    target_date: date,
    hour: int,
) -> float:
    """단일 주차장/시간의 기본 점유율을 계산한다."""
    is_weekend = target_date.weekday() >= 5
    poi_type = parking_lot_row["nearby_poi_type"]
    parking_type = parking_lot_row["parking_type"]
    occupancy = 0.35

    if hour < parking_lot_row["operation_start_hour"] or hour >= parking_lot_row["operation_end_hour"]:
        occupancy -= 0.25

    if 7 <= hour <= 10 and poi_type in {"office", "station"}:
        occupancy += 0.25
    if 11 <= hour <= 13 and poi_type in {"shopping", "office"}:
        occupancy += 0.18
    if 18 <= hour <= 21 and poi_type in {"shopping", "station", "event_venue"}:
        occupancy += 0.25
    if is_weekend and poi_type in {"shopping", "event_venue", "residential"}:
        occupancy += 0.18
    if poi_type == "hospital" and not is_weekend and 8 <= hour <= 16:
        occupancy += 0.22
    if poi_type == "university" and not is_weekend and 14 <= hour <= 21:
        occupancy += 0.16
    if external_factor_row["weather"] in {"RAIN", "SNOW"} and poi_type in {"station", "shopping", "office"}:
        occupancy += 0.12
    if external_factor_row["event_nearby"] and poi_type == "event_venue":
        occupancy += 0.30
    if external_factor_row["traffic_level"] == "HIGH":
        occupancy += 0.10
    if parking_type == "SHARED":
        occupancy -= 0.08
    return clamp(occupancy + random.uniform(-0.08, 0.08), 0.02, 0.98)


def build_time_frame(start_date: date, end_date: date) -> pd.DataFrame:
    holidays = get_mock_holidays(start_date, end_date)
    rows = []
    for current in pd.date_range(start_date, end_date, freq="D"):
        current_date = current.date()
        for hour in range(24):
            rows.append(
                {
                    "date": current_date.isoformat(),
                    "year": current_date.year,
                    "month": current_date.month,
                    "day": current_date.day,
                    "day_of_week": DAY_NAMES[current_date.weekday()],
                    "hour": hour,
                    "time_slot": get_time_slot(hour),
                    "is_weekend": current_date.weekday() >= 5,
                    "is_holiday": current_date.isoformat() in holidays,
                }
            )
    return pd.DataFrame(rows)


def generate_usage_history_chunk(
    parking_lots_chunk_df: pd.DataFrame,
    external_factors_df: pd.DataFrame,
    start_date: date,
    end_date: date,
    start_record_index: int,
) -> pd.DataFrame:
    time_df = build_time_frame(start_date, end_date)
    parking_lots_chunk_df = parking_lots_chunk_df.reset_index(drop=True)
    n_lots = len(parking_lots_chunk_df)
    n_times = len(time_df)

    chunk_df = pd.DataFrame(
        {
            "parking_lot_id": np.repeat(parking_lots_chunk_df["parking_lot_id"].to_numpy(), n_times),
            "district": np.repeat(parking_lots_chunk_df["district"].to_numpy(), n_times),
            "nearby_poi_type": np.repeat(parking_lots_chunk_df["nearby_poi_type"].to_numpy(), n_times),
            "parking_type": np.repeat(parking_lots_chunk_df["parking_type"].to_numpy(), n_times),
            "total_spaces": np.repeat(parking_lots_chunk_df["total_spaces"].to_numpy(), n_times),
            "operation_start_hour": np.repeat(parking_lots_chunk_df["operation_start_hour"].to_numpy(), n_times),
            "operation_end_hour": np.repeat(parking_lots_chunk_df["operation_end_hour"].to_numpy(), n_times),
        }
    )
    for column in time_df.columns:
        chunk_df[column] = np.tile(time_df[column].to_numpy(), n_lots)

    external_lookup = external_factors_df[
        ["district", "date", "hour", "weather", "event_nearby", "traffic_level"]
    ]
    chunk_df = chunk_df.merge(external_lookup, on=["district", "date", "hour"], how="left", validate="many_to_one")

    occupancy = np.full(len(chunk_df), 0.35, dtype=np.float32)
    hour = chunk_df["hour"]
    poi = chunk_df["nearby_poi_type"]
    weather = chunk_df["weather"]

    closed = (hour < chunk_df["operation_start_hour"]) | (hour >= chunk_df["operation_end_hour"])
    occupancy -= closed.to_numpy(dtype=np.float32) * 0.25
    occupancy += ((hour.between(7, 10)) & (poi.isin(["office", "station"]))).to_numpy(dtype=np.float32) * 0.25
    occupancy += ((hour.between(11, 13)) & (poi.isin(["shopping", "office"]))).to_numpy(dtype=np.float32) * 0.18
    occupancy += ((hour.between(18, 21)) & (poi.isin(["shopping", "station", "event_venue"]))).to_numpy(dtype=np.float32) * 0.25
    occupancy += (chunk_df["is_weekend"] & poi.isin(["shopping", "event_venue", "residential"])).to_numpy(dtype=np.float32) * 0.18
    occupancy += ((poi == "hospital") & (~chunk_df["is_weekend"]) & hour.between(8, 16)).to_numpy(dtype=np.float32) * 0.22
    occupancy += ((poi == "university") & (~chunk_df["is_weekend"]) & hour.between(14, 21)).to_numpy(dtype=np.float32) * 0.16
    occupancy += (weather.isin(["RAIN", "SNOW"]) & poi.isin(["station", "shopping", "office"])).to_numpy(dtype=np.float32) * 0.12
    occupancy += (chunk_df["event_nearby"] & (poi == "event_venue")).to_numpy(dtype=np.float32) * 0.30
    occupancy += (chunk_df["traffic_level"].eq("HIGH")).to_numpy(dtype=np.float32) * 0.10
    occupancy -= (chunk_df["parking_type"].eq("SHARED")).to_numpy(dtype=np.float32) * 0.08
    occupancy += np.random.normal(0, 0.06, len(chunk_df)).astype(np.float32)
    occupancy = np.clip(occupancy, 0.02, 0.98)

    total_spaces = chunk_df["total_spaces"].to_numpy()
    occupied_spaces = np.rint(total_spaces * occupancy).astype(int)
    occupied_spaces = np.clip(occupied_spaces, 0, total_spaces)
    available_spaces = total_spaces - occupied_spaces
    occupied_for_binomial = np.maximum(occupied_spaces, 0).astype(np.int32)
    reserved_spaces = np.minimum(
        occupied_spaces,
        np.random.binomial(occupied_for_binomial, np.random.uniform(0.03, 0.18, len(chunk_df))),
    )
    soon_available_spaces = np.minimum(
        occupied_spaces,
        np.random.binomial(occupied_for_binomial, np.random.uniform(0.02, 0.12, len(chunk_df))),
    )
    turnover_rate = np.round(np.clip(np.random.normal(0.35 + occupancy * 0.25, 0.12), 0.05, 0.90), 3)

    chunk_df["record_id"] = [f"USE-{idx:08d}" for idx in range(start_record_index, start_record_index + len(chunk_df))]
    chunk_df["occupied_spaces"] = occupied_spaces
    chunk_df["available_spaces"] = available_spaces
    chunk_df["reserved_spaces"] = reserved_spaces.astype(int)
    chunk_df["soon_available_spaces"] = soon_available_spaces.astype(int)
    chunk_df["occupancy_rate"] = np.round(occupied_spaces / total_spaces, 4)
    chunk_df["turnover_rate"] = turnover_rate

    result_df = chunk_df[USAGE_HISTORY_COLUMNS]
    validate_usage_history_chunk(result_df, parking_lots_chunk_df)
    return result_df


def write_usage_history_in_chunks(
    parking_lots_df: pd.DataFrame,
    external_factors_df: pd.DataFrame,
    start_date: date,
    end_date: date,
    output_path: Path,
) -> tuple[int, float]:
    total_rows = 0
    occupancy_sum = 0.0
    total_chunks = int(np.ceil(len(parking_lots_df) / CHUNK_SIZE_PARKING_LOTS))

    for chunk_number, start in enumerate(range(0, len(parking_lots_df), CHUNK_SIZE_PARKING_LOTS), start=1):
        parking_lots_chunk_df = parking_lots_df.iloc[start : start + CHUNK_SIZE_PARKING_LOTS].copy()
        chunk_df = generate_usage_history_chunk(
            parking_lots_chunk_df=parking_lots_chunk_df,
            external_factors_df=external_factors_df,
            start_date=start_date,
            end_date=end_date,
            start_record_index=total_rows + 1,
        )
        mode = "w" if chunk_number == 1 else "a"
        header = chunk_number == 1
        save_csv(chunk_df, output_path, mode=mode, header=header)

        chunk_rows = len(chunk_df)
        total_rows += chunk_rows
        occupancy_sum += float(chunk_df["occupancy_rate"].sum())
        progress = chunk_number / total_chunks * 100
        print(
            f"[usage chunk {chunk_number}/{total_chunks}] "
            f"rows={chunk_rows:,}, cumulative_rows={total_rows:,}, progress={progress:.1f}%"
        )

    average_occupancy = occupancy_sum / total_rows if total_rows else 0.0
    return total_rows, average_occupancy


def validate_parking_lots(df: pd.DataFrame) -> None:
    if df["parking_lot_id"].duplicated().any():
        raise ValueError("parking_lot_id must be unique.")
    if df["latitude"].isna().any() or df["longitude"].isna().any():
        raise ValueError("latitude and longitude must not be empty.")
    if (df["total_spaces"] < 1).any():
        raise ValueError("total_spaces must be greater than or equal to 1.")
    if not (df["is_public"] == (df["parking_type"] == "PUBLIC")).all():
        raise ValueError("is_public must match parking_type PUBLIC.")
    if not (df["is_shared"] == (df["parking_type"] == "SHARED")).all():
        raise ValueError("is_shared must match parking_type SHARED.")


def validate_external_factors(df: pd.DataFrame) -> None:
    if df.duplicated(subset=["district", "date", "hour"]).any():
        raise ValueError("district, date, hour must be unique in external_factors.")
    if (df.loc[~df["event_nearby"], "event_scale"] != "NONE").any():
        raise ValueError("event_scale must be NONE when event_nearby is false.")
    if (df.loc[df["weather"] == "SNOW", "season"] != "winter").any():
        raise ValueError("SNOW weather must only exist in winter.")


def validate_usage_history_chunk(chunk_df: pd.DataFrame, parking_lots_chunk_df: pd.DataFrame) -> None:
    lot_lookup = parking_lots_chunk_df.set_index("parking_lot_id")["total_spaces"]
    if not chunk_df["parking_lot_id"].isin(lot_lookup.index).all():
        raise ValueError("usage history contains unknown parking_lot_id.")
    total_spaces = chunk_df["parking_lot_id"].map(lot_lookup)
    if not ((chunk_df["occupied_spaces"] + chunk_df["available_spaces"]) == total_spaces).all():
        raise ValueError("occupied_spaces + available_spaces must equal total_spaces.")
    if not chunk_df["occupancy_rate"].between(0, 1).all():
        raise ValueError("occupancy_rate must be between 0 and 1.")
    if (chunk_df["available_spaces"] < 0).any():
        raise ValueError("available_spaces must not be negative.")
    if (chunk_df["reserved_spaces"] > chunk_df["occupied_spaces"]).any():
        raise ValueError("reserved_spaces must not exceed occupied_spaces.")
    if (chunk_df["soon_available_spaces"] > chunk_df["occupied_spaces"]).any():
        raise ValueError("soon_available_spaces must not exceed occupied_spaces.")


def save_csv(df: pd.DataFrame, path: Path, mode: str = "w", header: bool = True) -> None:
    df.to_csv(path, index=False, mode=mode, header=header, encoding=ENCODING, lineterminator="\n")


def print_overwrite_notice(paths: list[Path]) -> None:
    for path in paths:
        if path.exists():
            print(f"[overwrite] Existing file will be replaced: {path}")


def main() -> None:
    set_random_seed()
    _, raw_data_dir = get_project_paths()
    raw_data_dir.mkdir(parents=True, exist_ok=True)

    parking_lots_path = raw_data_dir / "parking_lots.csv"
    usage_history_path = raw_data_dir / "parking_usage_history.csv"
    external_factors_path = raw_data_dir / "external_factors.csv"
    print_overwrite_notice([parking_lots_path, usage_history_path, external_factors_path])

    start_date, end_date = get_date_range(YEARS_OF_HISTORY)
    print("[start] Generating SmartPark AI raw Mock data")
    print(f"[config] parking_lots={NUM_PARKING_LOTS:,}, years={YEARS_OF_HISTORY}, chunk_size={CHUNK_SIZE_PARKING_LOTS}")
    print(f"[config] period={start_date.isoformat()} ~ {end_date.isoformat()}")

    parking_lots_df = generate_parking_lots()
    save_csv(parking_lots_df, parking_lots_path)
    print(f"[done] parking_lots.csv path={parking_lots_path}, rows={len(parking_lots_df):,}")
    print(
        "[stats] parking_lots "
        f"districts={parking_lots_df['district'].nunique()}, "
        f"avg_total_spaces={parking_lots_df['total_spaces'].mean():.1f}, "
        f"nfc_rate={parking_lots_df['has_nfc'].mean():.2%}"
    )

    districts = sorted(parking_lots_df["district"].unique().tolist())
    external_factors_df = generate_external_factors(start_date, end_date, districts)
    save_csv(external_factors_df, external_factors_path)
    print(f"[done] external_factors.csv path={external_factors_path}, rows={len(external_factors_df):,}")
    print(
        "[stats] external_factors "
        f"districts={len(districts)}, "
        f"event_rows={int(external_factors_df['event_nearby'].sum()):,}, "
        f"rain_or_snow_rows={int(external_factors_df['weather'].isin(['RAIN', 'SNOW']).sum()):,}"
    )

    usage_rows, average_occupancy = write_usage_history_in_chunks(
        parking_lots_df=parking_lots_df,
        external_factors_df=external_factors_df,
        start_date=start_date,
        end_date=end_date,
        output_path=usage_history_path,
    )
    print(f"[done] parking_usage_history.csv path={usage_history_path}, rows={usage_rows:,}")
    print(f"[stats] parking_usage_history average_occupancy_rate={average_occupancy:.4f}")

    print("[done] Large CSV chunk writing completed.")
    print(
        "[summary] "
        f"parking_lots={len(parking_lots_df):,}, "
        f"external_factors={len(external_factors_df):,}, "
        f"parking_usage_history={usage_rows:,}, "
        f"period={start_date.isoformat()}~{end_date.isoformat()}, "
        f"districts={len(districts)}, "
        f"chunk_size={CHUNK_SIZE_PARKING_LOTS}"
    )
    print("[complete] SmartPark AI 혼잡도 분석 전 단계용 raw 데이터 생성 완료")


if __name__ == "__main__":
    main()
