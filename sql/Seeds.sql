INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 90000, 1), ("Sales Lead", 110000, 1), ("Senior Engineer", 200000, 2), ("Software Engineer", 150000, 2), ("Accountant", 140000, 3), ("Lawyer", 180000, 4), ("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Macaulay", "Culkin", 3, NULL), ("Christopher", "Walken", 4, 1), ("Arnold", "Schwarzenegger", 6, NULL), ("Stan", "Lee", 2, NULL), ("Rick", "James", 1, 4);