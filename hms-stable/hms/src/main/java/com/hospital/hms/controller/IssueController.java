package com.hospital.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hms.dto.Issue;
import com.hospital.hms.service.IssueService;

@RestController
@RequestMapping("issue")
public class IssueController {
    @Autowired
    IssueService issueService;

    @GetMapping("/all")
    public List<Issue> getAllIssues() {
        return this.issueService.getAllIssues();
    }

}
