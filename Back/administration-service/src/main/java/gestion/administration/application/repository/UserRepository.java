package gestion.administration.application.repository;

import gestion.administration.application.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public User findByUsername(String username);
    public User findById(ObjectId id);
}
