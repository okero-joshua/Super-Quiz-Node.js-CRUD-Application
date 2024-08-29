-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: xefi550t7t6tjn36.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
-- Generation Time: Aug 07, 2024 at 11:20 PM
-- Server version: 8.0.35
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `m2qmrpzqz1yvzazf`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `category_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(15, 'Video Games'),
(18, 'Computer Science');

-- --------------------------------------------------------

--
-- Table structure for table `correct_answers`
--

CREATE TABLE `correct_answers` (
  `question_id` int DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `correct_answers`
--

INSERT INTO `correct_answers` (`question_id`, `username`) VALUES
(9, 'abc'),
(6, 'abc'),
(4, 'abc'),
(1, 'abc'),
(7, 'abc'),
(2, 'abc'),
(8, 'abc'),
(7, 'testuser1'),
(5, 'zach'),
(10, 'zach'),
(2, 'zach'),
(5, 'test1'),
(2, 'test1'),
(3, 'testuser4'),
(6, 'testuser4'),
(1, 'testuser4'),
(7, 'testuser4'),
(14, 'abc'),
(5, 'abc'),
(3, 'abc'),
(5, 'user66'),
(9, 'user66'),
(7, 'test1'),
(9, 'test1'),
(3, 'test1'),
(7, 'zach'),
(3, 'user77'),
(2, 'user77'),
(5, 'user88');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int NOT NULL,
  `question_text` varchar(1000) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `correct_answer` varchar(255) DEFAULT NULL,
  `incorrect_answer1` varchar(255) DEFAULT NULL,
  `incorrect_answer2` varchar(255) DEFAULT NULL,
  `incorrect_answer3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question_text`, `category`, `correct_answer`, `incorrect_answer1`, `incorrect_answer2`, `incorrect_answer3`) VALUES
(1, 'The programming language \'Swift\' was created to replace what other programming language?', '15', 'Objective-C', 'C#', 'Ruby', 'C++'),
(2, 'Which computer hardware device provides an interface for all other connected devices to communicate?', '15', 'Motherboard', 'Central Processing Unit', 'Hard Disk Drive', 'Random Access Memory'),
(3, 'What does the computer software acronym JVM stand for?', '15', 'Java Virtual Machine', 'Java Vendor Machine', 'Java Visual Machine', 'Just Virtual Machine'),
(4, 'When Gmail first launched, how much storage did it provide for your email?', '15', '1GB', '512MB', '5GB', 'Unlimited'),
(5, 'Which programming language shares its name with an island in Indonesia?', '15', 'Java', 'Python', 'C', 'Jakarta'),
(6, 'Which of these is a type of monster found in Minecraft?', '15', 'Skeleton', 'Werewolf', 'Vampire', 'Minotaur'),
(7, 'Which of the following is not a faction in Tom Clancy\'s The Division?', '15', 'CDC', 'Cleaners', 'Last Man Batallion', 'Rikers'),
(8, 'Which of the following Zelda games did not feature Ganon as a final boss?', '15', 'Majora\'s Mask', 'Ocarina of Time', 'Skyward Sword', 'Breath of the Wild'),
(9, 'What year was the game \"Overwatch\" revealed?', '15', '2014', '2015', '2011', '2008'),
(10, 'Who created the \"Metal Gear\" Series?', '15', 'Hideo Kojima', 'Hiroshi Yamauchi', 'Shigeru Miyamoto', 'Gunpei Yokoi'),
(11, 'Who is the main protagonist in the game Life is Strange: Before The Storm?', '15', 'Chloe Price ', 'Max Caulfield', 'Rachel Amber', 'Frank Bowers'),
(12, 'What is the default alias that Princess Garnet goes by in Final Fantasy IX?', '15', 'Dagger', 'Dirk', 'Garnet', 'Quina'),
(13, 'Which of these is NOT a playable character in \"Left 4 Dead\"?', '15', 'Nick', 'Louis', 'Zoey', 'Bill'),
(14, 'Which of the following Elite Four members from the 6th Generation of Pokémon was a member of Team Flare?', '15', 'Malva', 'Siebold', 'Wikstrom', 'Drasna'),
(15, 'Which game did \"Sonic The Hedgehog\" make his first appearance in?', '15', 'Rad Mobile', 'Sonic The Hedgehog', 'Super Mario 64', 'Mega Man'),
(16, 'Gordon Freeman is said to have burnt and destroyed what food in the break room microwave?', '15', 'Casserole', 'Sub Sandwich', 'Chicken Soup', 'Pepperoni Pizza'),
(17, 'Which Pokemon generation did the fan-named \"Masuda Method\" first appear in? ', '15', 'Diamond/Pearl', 'Ruby/Sapphire', 'Black/White', 'X/Y'),
(18, 'What is the name of the 4-armed Chaos Witch from the 2016 video game \"Battleborn\"?', '15', 'Orendi', 'Orendoo', 'Oranda', 'Randy'),
(19, 'In what year was \"Antichamber\" released?', '15', '2013', '2012', '2014', '2011'),
(20, 'In the game Battleblock Theater, what was the name of the voice actor who voiced the narrator?', '15', 'Will Stamper', 'Steve Blum', 'Richard Epcar', 'Yuri Lowenthal'),
(21, 'In \"Fallout 4\" which faction is not present in the game?', '15', 'The Enclave', 'The Minutemen', 'The Brotherhood of Steel', 'The Institute');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `total_score` int DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `total_score`, `is_admin`) VALUES
('abc', '$2b$10$sno3NKlsGbevsKuiYbr7T./TeQFh2heCxF3G1JLTkNsS/RzWKB..q', 'Thomas', 'Wood', NULL, 1),
('admin', 'adminpassword', 'Admin', 'User', 0, 1),
('admin2', '$2b$10$JnOCGRbz2Svi0ZOGltcKpe.x7OMNoNognBSlKERW6uZ7GaNt86tVS', 'asdf', 'asdf', 0, 0),
('admin22', '$2b$10$B2rRuvgyiDy6EmnQOm4iV./HYqD0rmctrCflohYGYq.exi2DEbhIO', 'admin22', 'asdf', 0, 1),
('admin33', '$2b$10$EMiCpiJremP/JflTvF1cdOA3nf7IUYpYS8MMeAGneR6n.utvQFpby', 'admin33', 'asdf', 0, 1),
('admin4', '$2b$10$jUtD0iO83hHXqcAVklwgUeCUJISvmu1sOXrmJEtWR3r30zVCTwAva', 'admin4', 'asdf', 0, 0),
('admin5', '$2b$10$Hfho7Df.Sy25LisYCPyvBe08FtWND9jXB9iUCKf5lbtUbti6EiiXm', 'admin', 'asdf', 0, 0),
('admin7', '$2b$10$NaGm.XixfBavEJBBRfuN..WGw1ymGn.vvsjfduPm91wfCrGlrMium', 'admin7', 'asdf', 0, 1),
('newuser', 'newpassword', 'UpdatedFirstName', 'User', 0, 0),
('test1', '$2b$10$78IbVqmNbZ2VF5Qpj7AJ9OAGAwMCsaaOjLszMlcYnbI.j/KfOF8T.', 'test', 'test', NULL, NULL),
('testuser', '$2b$10$m8I7X3CFRAQEI47nH.LQXeIffjV01vCTbRcoB8kdJxV43MnvMm/Jm', 'testuser', 'user', NULL, 1),
('testuser1', '$2b$10$M2/zGQXZHYQd3QIE4ud5Ee.uI6yD6Z2/JXHv.CmrhWP1Z7ark2Kp6', 'Thomas', '', 0, 1),
('testuser2', '$2b$10$htJZBt/wNBeqmJeY1yECvOr5wKcXmSwaGIcHoAaQI4IYTUlqcvKEm', 'testuser2', 'testuser2', 0, 1),
('testuser3', '$2b$10$ZJrzYla7kDyQWRR70v/92et1Q5IFQY1x.3kN2b33hybThY8Jw05jq', 'Benjamin', 'Buttons', 0, NULL),
('testuser4', '$2b$10$FalS0GEW/K0ejadtH/abEey9rHhhy/o4un8lkNmety5s1ekXVJkmm', 'Benjamin', 'No', 0, 1),
('testuser5', '$2b$10$ciWaZ2vT1beA5Cuoc1CqH.T3vaih5YBHxsy0uObi1wtQ6rFfdMm/C', 'Joe', 'Smith', 0, 0),
('user21', '$2b$10$r3NQTib8WN1ROHEoAgrUa.e8Ia04HLKkgKInlp21F/rAHfP6dncMS', 'asdfasdf', 'asdf', 0, 0),
('user244', '$2b$10$rPWrfpOPI9pt0yPaN8nhpeZZiV17.DOiOzlp802o89OVa3QWC5noC', 'asdfasdf', 'asdffdas', 0, 0),
('user333', '$2b$10$cd8CZT9Bqndzd5WuTIrujubzU0m8MN/q2xeKq9jt5yxMUvThAItoy', 'user334', 'asdf', 0, 0),
('user37', '$2b$10$P7uOVhhCgMBn1/p2B1XCU.uZ7rtBs128UuMaFNm4p7p6fD5BkJP96', 'Tyler', 'adfsdf', 0, 0),
('user444', '$2b$10$Jbug6nBhegGiuCn4Tk.rMuembqx9WRR/5aZpU4cpJTf36SiCoVcXi', 'Tyler', 'asdf', 0, 0),
('user55', '$2b$10$kEMwjBGXhH0fetLlbRNneO03Y/Sz4cGhn2ZACRIKFIirP1HAkSpEu', 'user5', 'asdf', 0, NULL),
('user555', '$2b$10$XFKrUn83pbhPBowKVT7Ca.EpRu8b/2EWS6/hKjgvSWEsfUy23E9Be', 'user556', 'asdf', 0, 0),
('user66', '$2b$10$3YyPoUPJ3tq88v.q96cSW.QmPfyIUgw38TAZDM.2ycV2JdFq8SbXW', 'user66', 'asdf', 0, 0),
('user77', '$2b$10$Z4oOFZ.AFwUO0/Nw2bxHKescUgWQMJjBLqyVma1CVkbfRz.FojFUq', 'user777', 'asdffdsa', 0, 0),
('user88', '$2b$10$3uX30EIzC2ZJsBb0bgo93ujd5LJAfV1HkNvg/0nUF7Hls1nD3jHse', 'user99', 'user88', 0, 0),
('user99', '$2b$10$7w9DeMNUTNPVqKRlgVx7muycJ5WI8J.cXf6CnvE3IZZ/vF9Jcgd5.', 'user999', 'asdf', 0, 0),
('usertester', '$2b$10$F3yykFbzEuz2zjptVQHsxe6tu7pNOqbLkRDC8YBT599tfJWP9c7vS', 'Thomas', 'Wood', 0, 0),
('zach', '$2b$10$99hEkE4J8CUrLEoEAyOLwOY0SQGKFzAvnDvb.VldIZAi6BxZDAH3m', 'zach', '', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `correct_answers`
--
ALTER TABLE `correct_answers`
  ADD KEY `loginId` (`username`),
  ADD KEY `correct_answers_ibfk_1` (`question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `correct_answers`
--
ALTER TABLE `correct_answers`
  ADD CONSTRAINT `correct_answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`),
  ADD CONSTRAINT `correct_answers_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
