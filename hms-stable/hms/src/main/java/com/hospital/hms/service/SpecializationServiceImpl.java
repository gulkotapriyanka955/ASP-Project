package com.hospital.hms.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.hms.dto.Specialization;
import com.hospital.hms.entity.SpecializationEntity;
import com.hospital.hms.repository.SpecializationRepository;

@Service
public class SpecializationServiceImpl implements SpecializationService {

    @Autowired
    private SpecializationRepository specializationRepository;

    //get all specializations
    @Override
    public List<Specialization> getAllSpecializations() {
        ModelMapper modelMapper = new ModelMapper();
        Iterable<SpecializationEntity> entities = this.specializationRepository.findAll();
        List<Specialization> specializations = new ArrayList<>();

        entities.forEach(entity -> {
            specializations.add(modelMapper.map(entity, Specialization.class));
        });

        return specializations;
    }
}
