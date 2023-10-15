import { Address, Country } from './AddressModel';

export interface UserFrofile {
  id?: string;
  fullName: string;
  department: string;
  address: Address;
  country: Country;
}



// public class User {
//   private String fullName;
//   private Department department;
//   private Role role;
//   private Address address;
//   private Country country;


// public class Address {
//   private String street;
//   private String city;
//   private String state;
//   private String postcode;



// create table Employee(
//   ID UUID not null primary key,
//   FULL_NAME varchar (150) not null,
//   EMAIL varchar (100) not null,
//   PASSWORD varchar (20) not null,
//   PHONE_NUMBER varchar (50) not null,
//   AVATAR varchar (250)
// );



// create table Address(
//  ID UUID not null primary key,
//  STREET varchar (150),
//  POST_CODE varchar (10) not null,
//  State_Province varchar (150),
//  CITY varchar (50) not null,
//  COUNTRY_ID UUID,
//  EMPLOYEE_ID UUID,
//  constraint fk_COUNTRY_ID
//      foreign key (COUNTRY_ID)
//          references Country(ID),
//  constraint fk_EMPLOYEE_ID
//      foreign key (EMPLOYEE_ID)
//          references Employee(ID)
// );
