package com.rental.service.admin;

import com.rental.dto.BookACarDto;
import com.rental.dto.CarDto;
import com.rental.dto.CarDtoListDto;
import com.rental.dto.SearchCarDto;
import com.rental.entity.BookACar;
import com.rental.entity.Car;
import com.rental.enums.BookCarStatus;
import com.rental.repository.BookACarRepository;
import com.rental.repository.CarRepository;
import com.rental.utils.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final CarRepository carRepository;

    private final BookACarRepository bookACarRepository;

    private final ImageUtils imageUtils;

    @Override
    public boolean postCar(CarDto carDto) throws IOException {
        try {
            Car car = new Car();
            car.setName(carDto.getName());
            car.setBrand(carDto.getBrand());
            car.setColor(carDto.getColor());
            car.setPrice(carDto.getPrice());
            car.setYear(carDto.getYear());
            car.setType(carDto.getType());
            car.setDescription(carDto.getDescription());
            car.setTransmission(carDto.getTransmission());
            
            // Save image to file system and store path
            if (carDto.getImage() != null && !carDto.getImage().isEmpty()) {
                String imagePath = imageUtils.saveImage(carDto.getImage());
                car.setImagePath(imagePath);
            }
            
            carRepository.save(car);
            return true;
        }catch (Exception e){
            return  false;
        }
    }

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public void deleteCar(Long id){
        Optional<Car> optionalCar = carRepository.findById(id);
        if (optionalCar.isPresent()) {
            Car car = optionalCar.get();
            // Delete image file if exists
            if (car.getImagePath() != null) {
                imageUtils.deleteImage(car.getImagePath());
            }
            carRepository.deleteById(id);
        }
    }

    @Override
    public CarDto getCarById(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public boolean updateCar(Long carId, CarDto carDto) throws IOException {
        Optional<Car> optionalCar = carRepository.findById(carId);
        if (optionalCar.isPresent()){
            Car existingCar = optionalCar.get();
            
            // Handle image update
            if (carDto.getImage() != null && !carDto.getImage().isEmpty()) {
                // Delete old image if exists
                if (existingCar.getImagePath() != null) {
                    imageUtils.deleteImage(existingCar.getImagePath());
                }
                // Save new image
                String imagePath = imageUtils.saveImage(carDto.getImage());
                existingCar.setImagePath(imagePath);
            }
            
            existingCar.setPrice(carDto.getPrice());
            existingCar.setYear(carDto.getYear());
            existingCar.setType(carDto.getType());
            existingCar.setDescription(carDto.getDescription());
            existingCar.setTransmission(carDto.getTransmission());
            existingCar.setColor(carDto.getColor());
            existingCar.setName(carDto.getName());
            existingCar.setBrand(carDto.getBrand());
            carRepository.save(existingCar);
            return true;
        }else {
            return false;
        }
    }

    @Override
    public List<BookACarDto> getBookings() {
        return bookACarRepository.findAll().stream().map(BookACar::getBookACarDto).collect(Collectors.toList());
    }

    @Override
    public boolean changeBookingStatus(Long bookingId, String status) {
        Optional<BookACar> optionalBookACar = bookACarRepository.findById(bookingId);
        if (optionalBookACar.isPresent()){
            BookACar existingCar = optionalBookACar.get();
            if (Objects.equals(status,"Approve"))
                existingCar.setBookCarStatus(BookCarStatus.APPROVED);
            else
                existingCar.setBookCarStatus(BookCarStatus.REJECTED);
            bookACarRepository.save(existingCar);
            return true;
        }
        return false;
    }

    @Override
    public CarDtoListDto searchCar(SearchCarDto searchCarDto) {
        Car car = new Car();
        car.setBrand(searchCarDto.getBrand());
        car.setType(searchCarDto.getType());
        car.setTransmission(searchCarDto.getTransmission());
        car.setColor(searchCarDto.getColor());
        ExampleMatcher exampleMatcher = ExampleMatcher
                .matchingAll()
                .withMatcher("brand",ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("type",ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("transmission",ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("color",ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());
        Example<Car> carExample = Example.of(car,exampleMatcher);
        List<Car> carList = carRepository.findAll(carExample);
        CarDtoListDto carDtoListDto = new CarDtoListDto();
        carDtoListDto.setCarDtoList(carList.stream().map(Car::getCarDto).collect(Collectors.toList()));
        return carDtoListDto;
    }
}
