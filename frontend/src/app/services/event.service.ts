
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PRODUCT_BY_GROUP, PRODUCT_BY_ID_URL, PRODUCT_URL,ADD_PRODUCT_URL, SOLO_EVENT_PARTICIPATION, GROUP_EVENT_PARTICIPATION, SET_LEADER, ADD_MEMBER, GROUP_EVENT, GET_SOLOPARTICIPANT, GET_GROUPPARTICIPANT } from '../shared/constants/urls';
import { Events, Products} from '../shared/Product';
import { ToastrService } from 'ngx-toastr';
import { InewProduct } from '../shared/interfaces/inew-product';
import { groupparticpation, soloparticpation } from '../shared/student';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  user:any;
  constructor(private http:HttpClient,private toastrservice:ToastrService) { }
  getAll():Observable<Products[]>{
    return this.http.get<Products[]>(PRODUCT_URL);
  }

  getEventById(productId:string):Observable<Products>{
    return this.http.get<Products>(PRODUCT_BY_ID_URL+productId);
  }

  getEventDetails(productId:string):Observable<Events>{
    return this.http.get<Events>(PRODUCT_BY_ID_URL+productId);
  }

  getEventByGroup(groupName:string):Observable<Events[]>{
    return this.http.get<Events[]>(PRODUCT_BY_GROUP+groupName);
  }

  addevent(newproduct:InewProduct): Observable<any>{
    return this.http.post<any>(ADD_PRODUCT_URL, newproduct).pipe(
      tap({
        next: (user) => {
 
          this.toastrservice.success(
            'Event Added Successfully'
          )
        },
        error: (errorResponse) => {
          this.toastrservice.error(errorResponse.error,
            'Failed to add event')
        }
      })
    )
  }

  soloevent(event:soloparticpation): Observable<any>{
    return this.http.post<any>(SOLO_EVENT_PARTICIPATION, event)
  }

  setleader(event:groupparticpation): Observable<any>{
    return this.http.post<any>(SET_LEADER, event)
  }

  addmember(event:soloparticpation): Observable<any>{
    return this.http.post<any>(ADD_MEMBER, event)
  }

  groupevent(event:groupparticpation): Observable<any>{
    return this.http.post<any>(GROUP_EVENT_PARTICIPATION, event)
  }

  participates(details: any): Observable<any>{
    return this.http.post(GROUP_EVENT, details);
  }

  getsoloparticipants(productname:string):Observable<any>{
    console.log(productname)
    return this.http.get<any>(GET_SOLOPARTICIPANT+productname);
  }

  getgroupparticipants(productname:string):Observable<any>{
    console.log(productname)
    return this.http.get<any>(GET_GROUPPARTICIPANT+productname);
  }

}
