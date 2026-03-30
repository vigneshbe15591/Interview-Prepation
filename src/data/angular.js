export const meta = {
  id: "angular",
  label: "Angular",
  icon: "🅰️",
  color: "#dd0031",
  desc: "Platform and framework for building single-page client applications.",
};

export const qaData = [
  {
    q: "Components & Decorators",
    a: "Components are the building blocks of Angular apps. The @Component decorator defines metadata: selector, template, styles. Each component has a lifecycle managed by Angular.",
    code: `import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
  
  @Component({
    selector: "app-user-card",
    template: \`
      <div class="card">
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
        <button (click)="onSelect()">Select</button>
      </div>
    \`,
    styles: [\`
      .card { border: 1px solid #ccc; padding: 16px; }
    \`]
  })
  export class UserCardComponent implements OnInit {
    @Input()  user!: { name: string; email: string };
    @Output() selected = new EventEmitter<string>();
  
    ngOnInit() { console.log("Component ready"); }
    onSelect() { this.selected.emit(this.user.name); }
  }`,
  },
  {
    q: "Services & Dependency Injection",
    a: "Services are singleton classes that share data/logic across components. Angular's DI system injects them via constructors. @Injectable marks a class as injectable.",
    code: `import { Injectable } from "@angular/core";
  import { HttpClient } from "@angular/common/http";
  import { Observable } from "rxjs";
  
  @Injectable({ providedIn: "root" }) // singleton
  export class UserService {
    private apiUrl = "/api/users";
  
    constructor(private http: HttpClient) {}
  
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiUrl);
    }
  
    createUser(user: Partial<User>): Observable<User> {
      return this.http.post<User>(this.apiUrl, user);
    }
  }
  
  // Inject in component
  export class AppComponent {
    users: User[] = [];
    constructor(private userService: UserService) {}
    ngOnInit() {
      this.userService.getUsers().subscribe(u => this.users = u);
    }
  }`,
  },
  {
    q: "RxJS & Observables",
    a: "RxJS Observables handle async data streams. Angular uses them for HTTP, events, and state. Operators like map, filter, switchMap transform streams.",
    code: `import { fromEvent, interval } from "rxjs";
  import { map, filter, debounceTime, switchMap, takeUntil } from "rxjs/operators";
  
  // Transform stream
  interval(1000).pipe(
    map(n => n * 2),
    filter(n => n % 4 === 0),
    takeUntil(timer(10000)) // stop after 10s
  ).subscribe(console.log);
  
  // Search with debounce
  const search$ = fromEvent(inputEl, "input").pipe(
    map(e => (e.target as HTMLInputElement).value),
    debounceTime(300),
    filter(v => v.length > 2),
    switchMap(q => this.http.get(\`/api/search?q=\${q}\`))
  );
  search$.subscribe(results => this.results = results);`,
  },
  {
    q: "Angular Routing",
    a: "Angular Router enables navigation between views. Supports lazy loading, route guards, nested routes, and route parameters.",
    code: `// app-routing.module.ts
  const routes: Routes = [
    { path: "", component: HomeComponent },
    {
      path: "admin",
      loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
      canActivate: [AuthGuard]
    },
    { path: "user/:id", component: UserComponent },
    { path: "**", redirectTo: "" }
  ];
  
  // Route guard
  @Injectable({ providedIn: "root" })
  export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(): boolean {
      if (this.auth.isLoggedIn()) return true;
      this.router.navigate(["/login"]);
      return false;
    }
  }
  
  // Navigate programmatically
  constructor(private router: Router) {}
  goToUser(id: number) {
    this.router.navigate(["/user", id]);
  }`,
  },
  {
    q: "Angular Forms (Reactive)",
    a: "Reactive forms provide a model-driven approach with explicit control over form state and validation. FormGroup and FormControl manage the form tree.",
    code: `import { FormBuilder, Validators, FormGroup } from "@angular/forms";
  
  export class LoginComponent {
    form: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
      });
    }
  
    get email() { return this.form.get("email"); }
  
    onSubmit() {
      if (this.form.invalid) return;
      console.log(this.form.value);
    }
  }
  
  // Template
  // <form [formGroup]="form" (ngSubmit)="onSubmit()">
  //   <input formControlName="email" />
  //   <span *ngIf="email?.errors?.['required']">Required</span>
  //   <button [disabled]="form.invalid">Login</button>
  // </form>`,
  },
  {
    q: "Change Detection",
    a: "Angular checks component trees for changes after async events. OnPush strategy only checks when inputs change or events fire, improving performance significantly.",
    code: `import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
  
  // Default: checks on every event
  @Component({ selector: "app-default", template: "{{data}}" })
  export class DefaultComponent { @Input() data: any; }
  
  // OnPush: only checks when:
  // 1. @Input reference changes
  // 2. DOM event fires within the component
  // 3. Async pipe emits
  // 4. markForCheck() is called
  @Component({
    selector: "app-optimized",
    template: "{{data | async}}",
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class OptimizedComponent {
    @Input() data$: Observable<any>;
  }
  
  // Manual trigger
  constructor(private cdr: ChangeDetectorRef) {}
  refresh() { this.cdr.markForCheck(); }`,
  },
];
