import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { ChatService } from '../services/chat.service';
import { of } from 'rxjs';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatServiceMock: jasmine.SpyObj<ChatService>;

  beforeEach(() => {
    chatServiceMock = jasmine.createSpyObj('ChatService', ['sendMessage']);
    chatServiceMock.sendMessage.and.returnValue(of({ reply: 'AI Response' }));

    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      providers: [{ provide: ChatService, useValue: chatServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should send a message and receive a response', () => {
    component.userMessage = 'Hello';
    component.sendMessage();

    expect(chatServiceMock.sendMessage).toHaveBeenCalledWith('Hello');
    expect(component.chatHistory.length).toBe(2);
    expect(component.chatHistory[1].content).toBe('AI Response');
  });
});
