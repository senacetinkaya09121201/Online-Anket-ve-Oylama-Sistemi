import { Component } from '@angular/core';
import { PollService } from 'src/app/services/poll.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
   styleUrls: ['./create-poll.component.css'],
})
export class CreatePollComponent {
  question: string = '';
  options: string[] = [''];

  trackByIndex(index: number): number {
  return index;
}


  constructor(
    private pollService: PollService,
    private authService: AuthService,
    private router: Router
  ) {}

  
  addOption() {
    this.options.push('');
  }

  async createPoll() {
    const user = await this.authService.getCurrentUser(); // ✅ await eklendi
    const newPoll = {
      question: this.question,
      options: this.options,
      votes: Array(this.options.length).fill(0),
      creatorId: user?.uid || 'anon',
      createdAt: new Date(),
    };

    try {
      await this.pollService.addPoll(newPoll);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Anket eklenemedi:', error);
    }
  }
}
