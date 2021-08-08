INSERT INTO departments (dep_name)
VALUES
('Legal'),
('Accounting'),
('Sales');





INSERT INTO roles (job, salary, dep_id)
VALUES
('Attorney', 10, 1),
('Accountant', 70000, 1),
('Salesmen', 70000, 1),
('Intern', 35000, 2);



INSERT INTO employees(first_name, last_name, manager_id, role_id)
VALUES
('Ben', 'Gallagher', 1, 2),
('John', 'Doe', 3, 2);


