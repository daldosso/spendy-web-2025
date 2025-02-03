import { TestBed } from '@angular/core/testing';
import { ChatService } from '../services/chat.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatService]
    });

    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  fit('should send a message and receive a reply', () => {
    const mockResponse = { reply: 'Hello from AI' };
    
    service.sendMessage('Hello').subscribe(response => {
      expect(response.reply).toEqual(mockResponse.reply);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/chat');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
