package com.ssafy.ssagri.util.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {
    CustomExceptionStatus customExceptionStatus;
}
