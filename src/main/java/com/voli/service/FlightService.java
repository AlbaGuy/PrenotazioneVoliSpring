package com.voli.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.voli.model.Flight;
import com.voli.repository.FlightRepository;




@Service
public class FlightService {
	@Autowired
	private FlightRepository repo;

	public List<Flight> listAll() {
		return repo.findAll();
	}

	public List<Flight> findFlight(String destination) {
		List<Flight> flights = repo.findFlight(destination);
		return flights;
	}
	public Flight get(long id) {
		return repo.findById(id).get();
		
	}

	public void delete(long id) {
		repo.deleteById(id);
	}

	public void save(Flight flight) {
		repo.save(flight);
		repo.flush();
	}
}