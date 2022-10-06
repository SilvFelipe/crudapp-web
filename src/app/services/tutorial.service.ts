import { Tutorial } from './../model/tutorial';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const uri = environment.baseUrl + '/tutorials';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private apporvalStageMessage = new BehaviorSubject('');
  currentTitle = this.apporvalStageMessage.asObservable();

  setTitle(title:string){
    this.apporvalStageMessage.next(title);
    // console.log(this.apporvalStageMessage.next(title));
  }

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Tutorial[]>(uri);
  }

  findById(id: number) {
    return this.http.get(`${uri}/${id}`);
  }

  findByTitle(title: string) {
    return this.http.get<Tutorial[]>(`${uri}?title=${title}`);
  }

  create(data: any) {
    return this.http.post(uri, data);
  }

  update(data: any, id: number) {
    return this.http.put(`${uri}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${uri}/${id}`);
  }

  deleteAll() {
    return this.http.delete(uri);
  }

}
