package com.hospital.hms.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.hms.dto.Issue;
import com.hospital.hms.entity.IssueEntity;
import com.hospital.hms.repository.IssueRepository;

@Service
public class IssueServiceImpl implements IssueService{
    @Autowired
    private IssueRepository issueRepository;

    //get all the issues in database
    @Override
    public List<Issue> getAllIssues() {
        ModelMapper modelMapper = new ModelMapper();
        Iterable<IssueEntity> entities = this.issueRepository.findAll();
        List<Issue> issues = new ArrayList<>();

        entities.forEach(entity -> {
            issues.add(modelMapper.map(entity, Issue.class));
        });

        return issues;
    }
}
