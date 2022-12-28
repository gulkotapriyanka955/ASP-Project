package com.hospital.hms.service;

import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.hospital.hms.dto.EmailDetails;
import com.hospital.hms.dto.User;
import com.hospital.hms.entity.PasswordResetTokenEntity;
import com.hospital.hms.entity.UserEntity;
import com.hospital.hms.repository.PasswordResetTokenRepo;
import com.hospital.hms.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepo resetTokenRepo;

    @Autowired
    private EmailService emailService;

    @Value("${spring.web.host}") private String webUrl;


    // send user details if login id and password matches
    public User login(User user) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        UserEntity userEntity = this.userRepository.findByLoginIdAndPasswordAndRole(user.getLoginId(), user.getPassword(), user.getRole());

        if (userEntity == null) {
            throw new Exception("user does not exist");
        }

        return modelMapper.map(userEntity, User.class);
    }

    // send a forget password email
    @Override
    public void forgotPassword(String email) throws Exception {
        UserEntity user = userRepository.findByLoginId(email);

        if (user == null) {
            throw new Exception("email does not exist");
        }
        PasswordResetTokenEntity passwordResetTokenEntity = new PasswordResetTokenEntity();
        passwordResetTokenEntity.setResetToken(UUID.randomUUID().toString());
        passwordResetTokenEntity.setUser(user);
        passwordResetTokenEntity = resetTokenRepo.save(passwordResetTokenEntity);

        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(email);
        emailDetails.setMsgBody(webUrl + "reset-password/" + passwordResetTokenEntity.getResetToken());
        emailDetails.setSubject("HMS: Your password reset link is ready");
        emailService.sendEmail(emailDetails);
    }

    // send user details to ui based on token for reset password
    @Override
    public User getUserByToken(String token) {
        ModelMapper modelMapper = new ModelMapper();
        PasswordResetTokenEntity entity = resetTokenRepo.findByResetToken(token);

        return modelMapper.map(entity.getUser(), User.class);
    }

    // update user details
    @Override
    public User save(User user) {
        ModelMapper modelMapper = new ModelMapper();
        UserEntity entity = modelMapper.map(user, UserEntity.class);
        entity = userRepository.save(entity);

        return modelMapper.map(entity, User.class);
    }
}
