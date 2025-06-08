import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';
import { Poll } from 'src/app/models/poll.model';

@Component({
  selector: 'app-edit-poll',
  templateUrl: './edit-poll.component.html',
   styleUrls: ['./edit-poll.component.css'],
})
export class EditPollComponent implements OnInit {
  poll!: Poll;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private pollService: PollService,
    private router: Router
  ) {}

  removeLastOption() {
  // En az 2 geçerli seçenek varsa silmeye izin ver
  const filledOptions = this.poll.options.filter(opt => opt.trim() !== '');
  if (filledOptions.length > 2) {
    this.poll.options.pop();
    this.poll.votes.pop();
  } else {
    alert("En az 2 geçerli seçenek olmalıdır.");
  }
}



  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pollService.getPollById(id).then((doc) => {
        if (doc.exists()) {
          this.poll = { id, ...(doc.data() as Poll) };
          this.loading = false;
        }
      });
    }
  }

  addOption() {
    this.poll.options.push('');
    this.poll.votes.push(0);
  }

  async updatePoll() {
    await this.pollService.updatePoll(this.poll);
    this.router.navigate(['/home']);
  }
}
