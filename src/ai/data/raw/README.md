# data/raw

이 폴더는 SmartPark AI 혼잡도 분석에 사용할 원본 Mock 데이터를 저장하는 위치이다. 실제 개인정보나 실제 차량 데이터는 저장하지 않는다.

## 생성 파일

- `parking_lots.csv`: 주차장 기본 정보 1000개
- `parking_usage_history.csv`: 주차장별 최근 5년치 시간대별 이용 이력
- `external_factors.csv`: district, date, hour 기준 날씨, 이벤트, 교통 외부 요인

## 실행 명령

```bash
python scripts/generate_mock_parking_data.py
```

자세한 컬럼 정의는 `../../docs/DATA_SCHEMA.md`를 참고한다.
