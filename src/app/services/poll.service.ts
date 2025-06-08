import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  DocumentData,
  CollectionReference,
    getDoc,
  setDoc 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Poll } from '../models/poll.model';


@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private firestore: Firestore) {}

  

  getPolls(): Observable<Poll[]> {
    const pollsRef = collection(this.firestore, 'polls');

    // 🔍 Konsola pollsRef türünü yazdır
    console.log('pollsRef typeof:', typeof pollsRef);
    console.log('pollsRef class:', pollsRef.constructor.name);

    const pollsQuery = query(pollsRef);

    // 🔍 Konsola pollsQuery türünü yazdır
    console.log('pollsQuery typeof:', typeof pollsQuery);
    console.log('pollsQuery class:', pollsQuery.constructor.name);

    return collectionData(pollsQuery, { idField: 'id' }) as Observable<Poll[]>;
  }

  addPoll(poll: Poll) {
    const pollsRef = collection(this.firestore, 'polls');
    return addDoc(pollsRef, poll);
  }

  vote(pollId: string, optionIndex: number, votes: number[]) {
    const pollRef = doc(this.firestore, 'polls', pollId);
    const newVotes = [...votes];
    newVotes[optionIndex]++;
    return updateDoc(pollRef, { votes: newVotes });
  }

  deletePoll(pollId: string) {
    const pollRef = doc(this.firestore, `polls/${pollId}`);
    return deleteDoc(pollRef);
  }

  updatePoll(poll: Poll) {
    const pollRef = doc(this.firestore, `polls/${poll.id}`);
    return updateDoc(pollRef, {
      question: poll.question,
      options: poll.options,
      votes: poll.votes,
      updatedAt: new Date(), // opsiyonel
    });
  }

  getPollById(id: string) {
    const pollRef = doc(this.firestore, `polls/${id}`);
    return getDoc(pollRef);
  }

  // Kullanıcının daha önce oy verip vermediğini kontrol et
hasUserVoted(pollId: string, userId: string): Promise<boolean> {
  const voteRef = doc(this.firestore, 'votes', `${pollId}_${userId}`);
  return getDoc(voteRef).then(docSnap => docSnap.exists());
}

// Kullanıcının oy verme bilgisini kaydet
recordVote(pollId: string, userId: string, selectedOption: number) {
  const voteRef = doc(this.firestore, 'votes', `${pollId}_${userId}`);
  return setDoc(voteRef, {
    pollId,
    userId,
    selectedOption,
    timestamp: new Date(),
  });
}


}
