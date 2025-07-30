package com.rental.service.customer;

import com.rental.dto.BookACarDto;
import com.rental.dto.CarDto;
import com.rental.dto.CarDtoListDto;
import com.rental.dto.SearchCarDto;

import java.util.List;

public interface CustomerService {

    List<CarDto> getAllCars();

    boolean bookACar(BookACarDto bookACarDto);

    CarDto getCarById(Long carId);

    List<BookACarDto> getBookingsByUserId(Long userId);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);
}
