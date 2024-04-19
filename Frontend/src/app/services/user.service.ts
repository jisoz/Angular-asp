import { Injectable } from '@angular/core';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user: User) { 
    let users = [];
    const storedUsers = localStorage.getItem('Users');
    if (storedUsers) {
      try {
        users = JSON.parse(storedUsers);
        if (!Array.isArray(users)) {
          users = [users]; // If storedUsers is a single object, convert it to an array
        }
      } catch (e) {
        console.error('Error parsing stored users:', e);
      }
    }
    users = [user, ...users];
    localStorage.setItem('Users', JSON.stringify(users));
  }
  
}
