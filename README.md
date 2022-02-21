# Track-that

Hello and welcome to "Track that"!

## Description

This application is to view and manage company employees. The application accesses employee data in a MySQL database which stores employees, departments, and roles. The following functions are below:

### Employees

* View All Employees
* View Employees by Department
* View Employees by Manager
* Add Employee
* Remove Employee
* Update Employee Role
* Update Employee Manager

### Roles

* View All Roles
* Add Role
* Remove Role

### Departments

* View All Departments
* View Total Utilized Budget by Department
* Add Department
* Remove Department



## Table of Contents

* [Description](#description)
* [Demonstration](#demonstration)
* [Installation](#installation)
* [Usage](#usage)
* [Questions](#questions)


## Demonstration

View a demonstration of the app: [Track that](https://drive.google.com/file/d/1hj5XoQm47I5RmNBDf0Ssl2DWNC652ni0/view)

### Screenshots

![intro](/assets/images/intro.jpg)

![two selections](/assets/images/twoselections.jpg)


## Installation

To install dependencies, run the following:

`
npm i
`

Then build and seed the database with the files in the [sql folder](./sql/)., then run

`
mysql -u 'username' -p
password:
mysql source seeds.sql;
`

## Usage

After downloading the files and installing dependencies, run 

`
node index.js
`


## Questions

For any questions about this repo, Please contact me at [soliddan211@gmail.com](mailto:soliddan211@gmail.com). View more of my work in GitHub at [https://github.com/DanProgramsIt](https://github.com/DanProgramsIt)