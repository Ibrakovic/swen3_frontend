import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Import testing utilities
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user with the register method', () => {
    const dummyUser = { username: 'testuser', password: 'password123' };

    service.register(dummyUser).subscribe((res) => {
      expect(res).toEqual('User registered');
    });

    const req = httpMock.expectOne('http://localhost:8081/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush('User registered'); // Mock response
  });
});
