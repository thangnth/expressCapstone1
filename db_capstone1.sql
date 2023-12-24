-- -------------------------------------------------------------
-- TablePlus 5.6.8(524)
--
-- https://tableplus.com/
--
-- Database: db_capstone1
-- Generation Time: 2023-12-24 22:33:27.9150
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `image_collection` (
  `collect_id` int NOT NULL AUTO_INCREMENT,
  `img_id` int DEFAULT NULL,
  `saved_by_userID` int DEFAULT NULL,
  `saved_date` datetime DEFAULT NULL,
  PRIMARY KEY (`collect_id`),
  KEY `img_id` (`img_id`),
  CONSTRAINT `image_collection_ibfk_1` FOREIGN KEY (`img_id`) REFERENCES `images` (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `image_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `img_id` int DEFAULT NULL,
  `content` varchar(225) DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `img_id` (`img_id`),
  CONSTRAINT `image_comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `image_comment_ibfk_2` FOREIGN KEY (`img_id`) REFERENCES `images` (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `img_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `views` int DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  PRIMARY KEY (`img_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `refresh_token` text,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `image_collection` (`collect_id`, `img_id`, `saved_by_userID`, `saved_date`) VALUES
(3, 14, 0, '2023-12-24 14:48:54'),
(4, 15, 0, '2023-12-24 14:49:20'),
(5, 16, 0, '2023-12-24 15:27:41');

INSERT INTO `images` (`img_id`, `img_name`, `description`, `views`, `source`, `user_id`, `type_id`) VALUES
(7, 'Meo004', 'Mèo Bodoi', 0, '1703348923902_Meo0004.jpeg', 1, 1),
(9, 'Meo004', 'Mèo Bodoi', 0, '1703407389238_Meo0004.jpeg', 1, 1),
(10, 'Meo004', 'Mèo Bodoi', 0, '1703407503832_Meo0004.jpeg', 1, 1),
(11, 'Meo005', 'Mèo Cowboy', 0, '1703408009439_Meo0005.jpeg', 1, 1),
(12, 'Meo001', 'Mèo Yangho', 0, '1703428956440_Meo0001.jpeg', 1, 1),
(13, 'Meo001', 'Mèo Yangho', 0, '1703428969357_Meo0001.jpeg', 1, 1),
(14, 'Meo001', 'Mèo Yangho', 0, '1703429334901_Meo0001.png', 1, 1),
(15, 'Meo002', 'Mèo u', 0, '1703429360775_Meo0002.png', 1, 1),
(16, 'Meo002', 'Mèo u', 0, '1703431661016_Meo002.png', 1, 1);

INSERT INTO `users` (`user_id`, `full_name`, `email`, `avatar`, `pass_word`, `role`, `refresh_token`) VALUES
(1, 'Nguyễn Thị Hoa Thắng', 'thangnguyen@gmail.com', '', '$2b$10$5oI/bnaM0BzA4MWaXiPBSOuQNjeknRYFsltFC0pHuKP2WJ22GvYGe', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjEsImtleSI6MTcwMzMxNDg4NTI5OH0sImlhdCI6MTcwMzMxNDg4NSwiZXhwIjoxNzA0MTc4ODg1fQ.9c-Out7UcdiGBw_8iaTUAEl2iAKOkuKS9XktCi0r3fM');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;