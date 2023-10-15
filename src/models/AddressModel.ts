export interface Address {
  id?: string;
  city: string;
  state: string;
  postcode: string;
}

export interface Country {
  id?: string;
  countryName: string;
}


// public class Address {
//   private String street;
//   private String city;
//   private String state;
//   private String postcode;



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


// create table Country(
//   ID UUID not null primary key,
//   COUNTRY_NAME varchar (50) not null
// );
