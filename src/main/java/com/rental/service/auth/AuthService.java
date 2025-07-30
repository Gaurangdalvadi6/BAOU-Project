package com.rental.service.auth;

import com.rental.dto.SignupRequest;
import com.rental.dto.UserDto;

public interface AuthService {

    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
