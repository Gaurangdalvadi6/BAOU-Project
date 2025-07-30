package com.rental.service.admin;

import com.rental.dto.BookACarDto;
import com.rental.dto.CarDto;
import com.rental.dto.CarDtoListDto;
import com.rental.dto.SearchCarDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {

    boolean postCar(CarDto carDto) throws IOException;

    List<CarDto> getAllCars();

    void deleteCar(Long id);

    CarDto getCarById(Long id);

    boolean updateCar(Long carId,CarDto carDto) throws IOException;

    List<BookACarDto> getBookings();

    boolean changeBookingStatus(Long bookingId,String status);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);
}
