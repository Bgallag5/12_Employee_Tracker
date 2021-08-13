DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;


CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(60) NOT NULL
);



CREATE TABLE roles (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
job VARCHAR(30),
salary INTEGER,
dep_id INTEGER, 
FOREIGN KEY (dep_id) REFERENCES departments(id) ON DELETE SET NULL
);


CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INTEGER, 
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);





    -- role_id INTEGER,
    -- FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,