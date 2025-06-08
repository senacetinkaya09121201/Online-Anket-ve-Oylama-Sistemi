import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PollService } from 'src/app/services/poll.service';
import { Poll } from '../../models/poll.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  polls: Poll[] = [];
  currentUserId: string = '';

  constructor(
    private authService: AuthService,
    private pollService: PollService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().then((user) => {
      if (user) {
        this.currentUserId = user.uid;

        this.pollService.getPolls().subscribe({
          next: (data) => {
            console.log('Anketler geldi:', data);
            this.polls = data;
          },
          error: (err) => {
            console.error('Anket alınamadı:', err);
          },
        });
      }
    });
  }

  vote(poll: Poll, index: number) {
    this.authService.getCurrentUser().then((user) => {
      if (!user) {
        console.error('Kullanıcı yok');
        return;
      }

      const userId = user.uid;

      this.pollService.hasUserVoted(poll.id!, userId).then((hasVoted) => {
        if (hasVoted) {
          alert('Bu ankete zaten oy verdiniz!');
          return;
        }

        // Oy ver ve oy kaydını oluştur
        this.pollService
          .vote(poll.id!, index, poll.votes)
          .then(() => {
            return this.pollService.recordVote(poll.id!, userId, index);
          })
          .then(() => {
            // 🔄 Oy verildikten sonra anketleri tekrar yükle
            this.pollService.getPolls().subscribe((data) => {
              this.polls = data;
            });
          })
          .catch((error) => {
            console.error('Oy verme hatası:', error);
          });
      });
    });
  }

  deletePoll(pollId: string) {
    this.pollService
      .deletePoll(pollId)
      .then(() => console.log('Anket silindi:', pollId))
      .catch((err) => console.error('Silme hatası:', err));
  }

  logout() {
    this.authService.logout();
  }

  navigateToEdit(pollId: string) {
    this.router.navigate(['/edit', pollId]);
  }
}
