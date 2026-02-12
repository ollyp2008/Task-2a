CREATE TABLE Exam_Results(
    student_id VARCHAR(50) PRIMARY KEY NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    exam_id VARCHAR(50) NOT NULL,
    exam_board TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    subject INTEGER NOT NULL,
    grade VARCHAR(2) NOT NULL,
    remarks BOOLEAN NOT NULL,
    exam_date DATE NOT NULL,
);

INSERT INTO Exam_Results (student_id, student_name, exam_id, exam_board, subject_name, subject, grade, remarks, exam_date) VALUES
('S001', 'Alice Johnson', 'E1001', 'Board A', 'Mathematics', 101, 'A', TRUE, '2023-05-15'),
('S002', 'Bob Smith', 'E1002', 'Board B', 'Science', 1002, 'B', FALSE, '2023-05-16'),
('S003', 'Charlie Brown', 'E1003', 'Board A', 'History', 102, 'C', TRUE, '2023-05-17'),
('S004', 'Diana Prince', 'E1004', 'Board C', 'English', 103, 'A', FALSE, '2023-05-18'),
('S005', 'Ethan Hunt', 'E1005', 'Board B', 'Geography', 104, 'B', TRUE, '2023-05-19');

INSERT INTO Exam_Results (student_id, student_name, exam_id, exam_board, subject_name, subject, grade, remarks, exam_date) VALUES
('S006', 'Fiona Gallagher', 'E1006', 'Board A', 'Mathematics', 101, 'A', TRUE, '2023-05-20'),
('S007', 'George Michael', 'E1007', 'Board C', 'Science', 1002, 'C', FALSE, '2023-05-22'),
('S008', 'Hannah Baker', 'E1008', 'Board B', 'History', 102, 'B', TRUE, '2023-05-23'),
('S009', 'Ian Somerhalder', 'E1009', 'Board A', 'English', 103, 'A', FALSE, '2023-05-24'),
('S010', 'Jenna Marbles', 'E1010', 'Board C', 'Geography', 104, 'C', TRUE, '2023-05-25');
SELECT * FROM Exam_Results;


SELECT student_id, subject_name, grade
FROM Exam_Results;

SELECT student_name, exam_board, exam_date
FROM Exam_Results;

--drop table if exists Enrolment_Dates; line for if i need to drop the table

CREATE TABLE Enrolment_Dates(
    enrolment_id VARCHAR(50) PRIMARY KEY NOT NULL,
    enrolment_date DATE NOT NULL,
    enrolment_name VARCHAR(100) NOT NULL
);
INSERT INTO Enrolment_Dates (enrolment_id, enrolment_name, enrolment_date) VALUES
('S006', 'Fiona Gallagher', '2023-05-20'),
('S007', 'George Michael', '2023-05-22'),
('S008', 'Hannah Baker', '2023-05-23'),
('S009', 'Ian Somerhalder', '2023-05-24'),
('S010', 'Jenna Marbles', '2023-05-25');
SELECT * FROM Enrolment_Dates;

SELECT enrolment_id, enrolment_name, enrolment_date
FROM Enrolment_Dates;

--My code for the question 10 module 2 of the SQL Academy
SELECT FROM Heroes.HeroName, Missions.MissionDate
FROM Heroes, Missions
WHERE Missions.MissionDate > 2024-03-20
ORDER BY Missions.MissionDate DESC;