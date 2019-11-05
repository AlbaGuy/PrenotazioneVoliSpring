package com.voli.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.voli.model.Flight;
@Transactional
public interface FlightRepository extends JpaRepository<Flight, Long> {
	@Query(value = "SELECT f FROM Flight f WHERE f.destination LIKE :destination")
	List<Flight> findFlight(String destination);
}