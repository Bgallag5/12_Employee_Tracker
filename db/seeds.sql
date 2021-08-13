INSERT INTO departments (dep_name)
VALUES
('Legal'),
('Accounting and Sales'),
('Personnel');





INSERT INTO roles (job, salary, dep_id)
VALUES
('Attorney', 10, 1),
('Accountant', 70000, 2),
('Salesman', 70000, 2),
('Intern', 35000, 3),
('Manager', 65000, 3);



INSERT INTO employees(first_name, last_name, manager_id, role_id)
VALUES
('Ben', 'Gallagher', 1, 2),
('John', 'Jacob', 3, 3),
('Sarah', 'Sacker', 2, 2),
('Brett', 'Buyer', 1, 2),
('Derrick', 'Donner', 1, 1),
('Harriet', 'Harris', 2, 1),
('Tyler', 'Todd', 3, 4),
('Chris', 'Cuomo', 3, 4),
('Edmund', 'Einhert', 3, 5),
('Pierre', 'Paul', 1, 5),
('George', 'Grundfeld', 1, 3);


