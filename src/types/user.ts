export interface Id {
    id: number;
}

export interface User extends Id{
    email:    string;
    username: string;
    password: string;
    name:     Name;
    address:  Address;
    phone:    string;
}

export interface Address {
    city:        string;
    street:      string;
    number:      number;
    zipcode:     string;
    geolocation: Geolocation;
}

export interface Geolocation {
    lat:  string;
    long: string;
}

export interface Name {
    firstname: string;
    lastname:  string;
}
