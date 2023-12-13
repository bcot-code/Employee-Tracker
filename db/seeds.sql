INSERT INTO department (name)
VALUES ("Finance"),
       ("Sales"),
       ("Technology");

INSERT INTO role (title, salary, department_id)
VALUES ("Finance Agent", 15000, 1),
       ("Sales person", 80000, 2),
       ("Computer Science",90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jonh", "Smith", 1, NULL ),
       ("Ale", "Cabello", 1, 1),
       ("James","Bond", 2, NULL ),
       ("Kevin", "Techn", 3, 2);