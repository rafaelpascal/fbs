interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
}

interface IUser {
  _id: string;
  id: string;
  email: string;
  phone: string;
  fullName: string;
  name: {
    firstname: string;
    lastname: string;
  };
  photo: string;
  role: string;
  merchantId?: string;
  provider?: string;
  active?: boolean;
  verified?: boolean;
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;

  __v: number;
}
