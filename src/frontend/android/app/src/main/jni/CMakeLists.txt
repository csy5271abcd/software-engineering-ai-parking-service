cmake_minimum_required(VERSION 3.13)

project(appmodules)

include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# Workaround:
# React Native Android native build can fail on Windows + CMake 3.22 + NDK 27
# if libc++_shared is not linked into the generated appmodules target.
# This explicitly links the Android C++ shared runtime.
target_link_libraries(${CMAKE_PROJECT_NAME} c++_shared)

foreach(autolinked_library ${AUTOLINKED_LIBRARIES})
    if(TARGET ${autolinked_library})
        target_link_libraries(${autolinked_library} c++_shared)
    endif()
endforeach()

if(TARGET rnscreens)
    target_link_libraries(rnscreens c++_shared)
endif()

if(TARGET gesturehandler)
    target_link_libraries(gesturehandler c++_shared)
endif()

