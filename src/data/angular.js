export const meta = {
  id: "angular",
  label: "Angular",
  icon: "🅰️",
  color: "#dd0031",
  desc: "Platform and framework for building scalable single-page client applications using TypeScript.",
};

export const qaData = [
  // ─── BEGINNER ────────────────────────────────────────────
  {
    q: "What is Angular and what are its core features?",
    a: "Angular is a TypeScript-based open-source front-end framework developed by Google. It is a complete platform — not just a library — providing routing, forms, HTTP client, animations, testing utilities, and more out of the box. It uses a component-based architecture, dependency injection, and RxJS for reactive programming.",
    code: `// Angular application structure
// src/
//   app/
//     app.module.ts        ← root module (NgModule-based)
//     app.component.ts     ← root component
//     app.component.html   ← template
//     app.component.scss   ← styles
//   main.ts                ← bootstrap entry point

// ── main.ts (NgModule bootstrap) ─────────────────
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
platformBrowserDynamic().bootstrapModule(AppModule);

// ── main.ts (Standalone bootstrap - Angular 17+) ──
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]),
    provideHttpClient(),
  ],
});

// Angular core features:
// ✅ Component-based architecture
// ✅ TypeScript first-class support
// ✅ Dependency Injection (DI) system
// ✅ Two-way data binding
// ✅ RxJS-based reactive programming
// ✅ Angular CLI for scaffolding
// ✅ Built-in router, forms, HTTP client
// ✅ Ahead-of-Time (AOT) compilation
// ✅ Angular Universal (SSR)
// ✅ PWA support via @angular/pwa`,
  },
  {
    q: "What are Angular components and how do you create them?",
    a: "Components are the fundamental building blocks of Angular applications. Each component has a TypeScript class decorated with @Component, an HTML template, and optional styles. The decorator provides metadata like selector, template, and style URLs. Components encapsulate UI logic and data.",
    code: `import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

// ── Basic component ───────────────────────────────
@Component({
  selector:    "app-user-card",         // custom HTML tag
  templateUrl: "./user-card.component.html",
  styleUrls:   ["./user-card.component.scss"],
  // OR inline:
  template: \`
    <div class="card">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <button (click)="onSelect()">Select</button>
    </div>
  \`,
  styles: [\`
    .card { border: 1px solid #ccc; padding: 16px; border-radius: 8px; }
    h2    { color: #dd0031; }
  \`],
})
export class UserCardComponent implements OnInit {
  @Input()  user!:     { id: number; name: string; email: string };
  @Input()  isAdmin =  false;
  @Output() selected = new EventEmitter<number>();
  @Output() deleted  = new EventEmitter<void>();

  ngOnInit(): void {
    console.log("Component initialized with user:", this.user);
  }

  onSelect(): void {
    this.selected.emit(this.user.id);
  }

  onDelete(): void {
    this.deleted.emit();
  }
}

// ── Standalone component (Angular 14+) ────────────
@Component({
  selector:  "app-hello",
  standalone: true,            // no NgModule needed
  imports:   [CommonModule],   // import what you need
  template:  "<h1>Hello {{ name }}!</h1>",
})
export class HelloComponent {
  name = "Angular";
}

// ── Generate with CLI ──────────────────────────────
// ng generate component user-card
// ng g c user-card --standalone
// ng g c user-card --skip-tests`,
  },
  {
    q: "What are Angular modules (NgModule)?",
    a: "NgModules are containers that group related components, directives, pipes, and services. Every Angular app has at least one root module (AppModule). Modules declare what they contain, import what they need, export what others can use, and provide services.",
    code: `import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

// ── Root module ───────────────────────────────────
@NgModule({
  declarations: [
    AppComponent,        // declare components, directives, pipes
    UserCardComponent,
    UserListComponent,
    HighlightDirective,
    CurrencyFormatPipe,
  ],
  imports: [
    BrowserModule,       // provides browser essentials (only once)
    FormsModule,         // template-driven forms
    ReactiveFormsModule, // reactive forms
    HttpClientModule,    // HTTP client
    RouterModule.forRoot(routes), // routing
    UserModule,          // feature module
  ],
  providers: [
    UserService,         // provide services (app-wide)
    { provide: API_URL, useValue: "https://api.example.com" },
  ],
  bootstrap: [AppComponent], // root component to bootstrap
  exports: [],               // only needed for shared modules
})
export class AppModule {}

// ── Feature module ────────────────────────────────
@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports:      [CommonModule, SharedModule, UserRoutingModule],
  providers:    [UserService],
  exports:      [UserListComponent], // available to importing modules
})
export class UserModule {}

// ── Shared module ─────────────────────────────────
@NgModule({
  declarations: [ButtonComponent, CardComponent, LoadingSpinnerComponent],
  imports:      [CommonModule],
  exports:      [
    CommonModule,             // re-export for convenience
    ButtonComponent,
    CardComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}`,
  },
  {
    q: "What is data binding in Angular?",
    a: "Data binding connects the component class to its template. Angular has four types: interpolation ({{ }}) for one-way class to DOM, property binding ([property]) for one-way class to DOM attributes, event binding ((event)) for DOM to class, and two-way binding ([(ngModel)]) for both directions.",
    code: `@Component({
  selector: "app-binding-demo",
  template: \`
    <!-- 1. Interpolation - class → DOM (text) -->
    <h1>{{ title }}</h1>
    <p>{{ getFullName() }}</p>
    <p>{{ user?.name | uppercase }}</p>
    <p>{{ 2 + 2 }}</p>

    <!-- 2. Property binding - class → DOM (attributes/props) -->
    <img [src]="imageUrl" [alt]="imageAlt" />
    <button [disabled]="isLoading">Submit</button>
    <input [value]="username" />
    <div [class.active]="isActive" [class.error]="hasError">content</div>
    <p [style.color]="textColor" [style.fontSize.px]="fontSize">text</p>
    <app-child [data]="parentData" [config]="{ theme: 'dark' }"></app-child>

    <!-- 3. Event binding - DOM → class -->
    <button (click)="handleClick()">Click me</button>
    <button (click)="handleClick($event)">Click with event</button>
    <input (input)="onInput($event)" (blur)="onBlur()" (keydown.enter)="onEnter()" />
    <form (ngSubmit)="onSubmit()">...</form>

    <!-- 4. Two-way binding - requires FormsModule -->
    <input [(ngModel)]="username" placeholder="Enter name" />
    <p>You typed: {{ username }}</p>

    <!-- Equivalent to two-way: -->
    <input
      [ngModel]="username"
      (ngModelChange)="username = $event"
    />

    <!-- 5. Attribute binding (for HTML attributes, not DOM properties) -->
    <td [attr.colspan]="columnSpan">Cell</td>
    <button [attr.aria-label]="buttonLabel">Action</button>
  \`,
})
export class BindingDemoComponent {
  title       = "Angular Binding Demo";
  imageUrl    = "https://angular.io/assets/images/logos/angular/angular.svg";
  imageAlt    = "Angular Logo";
  isLoading   = false;
  isActive    = true;
  hasError    = false;
  textColor   = "#dd0031";
  fontSize    = 16;
  username    = "";
  parentData  = { id: 1, name: "Alice" };
  columnSpan  = 3;
  buttonLabel = "Close dialog";

  getFullName()   { return "Alice Smith"; }
  handleClick()   { console.log("clicked"); }
  handleClick2(e: MouseEvent) { console.log(e.target); }
  onInput(e: Event) { console.log((e.target as HTMLInputElement).value); }
  onBlur()        { }
  onEnter()       { }
  onSubmit()      { }
}`,
  },
  {
    q: "What are Angular directives?",
    a: "Directives extend HTML by adding behavior. There are three types: components (directives with a view), structural directives (*ngIf, *ngFor, *ngSwitch — change DOM structure), and attribute directives (ngClass, ngStyle, custom — change element appearance or behavior).",
    code: `@Component({
  template: \`
    <!-- ── Structural Directives ─────────────────── -->

    <!-- *ngIf - conditionally render element -->
    <div *ngIf="isLoggedIn">Welcome, {{ user.name }}!</div>
    <div *ngIf="isLoggedIn; else loginTemplate">Logged In</div>
    <ng-template #loginTemplate><a routerLink="/login">Login</a></ng-template>

    <!-- *ngIf with then/else -->
    <div *ngIf="loading; then loadingTpl; else contentTpl"></div>
    <ng-template #loadingTpl><app-spinner></app-spinner></ng-template>
    <ng-template #contentTpl><app-content [data]="data"></app-content></ng-template>

    <!-- *ngFor - render list -->
    <li *ngFor="let item of items; let i = index; let last = last; trackBy: trackById">
      {{ i + 1 }}. {{ item.name }} {{ last ? '(last)' : '' }}
    </li>

    <!-- *ngSwitch - multiple conditions -->
    <div [ngSwitch]="status">
      <span *ngSwitchCase="'active'">🟢 Active</span>
      <span *ngSwitchCase="'inactive'">🔴 Inactive</span>
      <span *ngSwitchDefault>⚪ Unknown</span>
    </div>

    <!-- ── Attribute Directives ───────────────────── -->

    <!-- ngClass - dynamic classes -->
    <div [ngClass]="{ 'active': isActive, 'disabled': isDisabled }">...</div>
    <div [ngClass]="['btn', 'btn-primary', isLarge ? 'btn-lg' : 'btn-sm']">...</div>

    <!-- ngStyle - dynamic styles -->
    <div [ngStyle]="{ color: textColor, 'font-size': fontSize + 'px' }">...</div>

    <!-- ── Custom structural directive ───────────── -->
    <div *appRepeat="3">Repeated 3 times</div>

    <!-- ── ng-container (no DOM element) ─────────── -->
    <ng-container *ngIf="user">
      <span>{{ user.name }}</span>
      <span>{{ user.email }}</span>
    </ng-container>
  \`,
})
export class DirectiveDemoComponent {
  isLoggedIn = true;
  loading    = false;
  isActive   = true;
  isDisabled = false;
  isLarge    = true;
  textColor  = "blue";
  fontSize   = 16;
  status     = "active";
  user       = { name: "Alice", email: "alice@example.com" };
  items      = [{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }];

  trackById(index: number, item: { id: number }) { return item.id; }
}`,
  },
  {
    q: "What are Angular pipes and how do you create custom pipes?",
    a: "Pipes transform data for display in templates. Angular provides built-in pipes (date, currency, uppercase, lowercase, json, async, decimal, percent, slice, keyvalue). Custom pipes implement PipeTransform and can be pure (default, cached by value) or impure (re-evaluated on every change detection).",
    code: `// ── Built-in pipes ────────────────────────────────
@Component({
  template: \`
    <p>{{ name | uppercase }}</p>
    <p>{{ name | lowercase }}</p>
    <p>{{ name | titlecase }}</p>
    <p>{{ price | currency:'USD':'symbol':'1.2-2' }}</p>
    <p>{{ ratio | percent:'1.1-2' }}</p>
    <p>{{ bigNum | number:'1.0-0' }}</p>
    <p>{{ today | date:'MMM d, y' }}</p>
    <p>{{ today | date:'shortTime' }}</p>
    <p>{{ obj | json }}</p>
    <p>{{ longText | slice:0:100 }}...</p>
    <p>{{ observable$ | async }}</p>
    <li *ngFor="let entry of obj | keyvalue">{{ entry.key }}: {{ entry.value }}</li>

    <!-- Chaining pipes -->
    <p>{{ name | uppercase | slice:0:5 }}</p>
  \`,
})
export class PipeDemoComponent {
  name  = "alice smith";
  price = 1234.56;
  ratio = 0.7534;
  bigNum = 1234567;
  today = new Date();
  obj   = { a: 1, b: "two", c: true };
  longText = "Very long text that needs truncation...";
  observable$ = this.userService.getUser(1).pipe(map(u => u.name));
}

// ── Custom pipe ───────────────────────────────────
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name:  "truncate",
  pure:  true,         // default - only re-runs when input changes
  standalone: true,    // Angular 14+
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50, ellipsis = "..."): string {
    if (!value) return "";
    return value.length > limit ? value.substring(0, limit) + ellipsis : value;
  }
}

@Pipe({ name: "timeAgo", standalone: true })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    const date  = new Date(value);
    const now   = new Date();
    const secs  = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (secs < 60)   return "just now";
    if (secs < 3600) return \`\${Math.floor(secs / 60)}m ago\`;
    if (secs < 86400)return \`\${Math.floor(secs / 3600)}h ago\`;
    return \`\${Math.floor(secs / 86400)}d ago\`;
  }
}

// Usage: {{ post.createdAt | timeAgo }}
// Usage: {{ description | truncate:100 }}`,
  },
  {
    q: "What are Angular services and dependency injection?",
    a: "Services are singleton classes that share logic, data, and state across components. Angular's DI system provides services to components via their constructors. Services are registered with providers at module, component, or root level. @Injectable marks a class as injectable.",
    code: `import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, tap, catchError, throwError } from "rxjs";

// ── Service definition ────────────────────────────
@Injectable({
  providedIn: "root",  // singleton across entire app (tree-shakable)
  // providedIn: UserModule  ← scoped to module
  // No providedIn          ← must register in module providers array
})
export class UserService {
  private readonly apiUrl = "https://api.example.com/users";
  private readonly http   = inject(HttpClient);    // inject() function

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(users => this.usersSubject.next(users)),
      catchError(err => throwError(() => new Error(err.message)))
    );
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }

  create(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(newUser => this.usersSubject.next([...this.usersSubject.value, newUser]))
    );
  }

  update(id: number, changes: Partial<User>): Observable<User> {
    return this.http.patch<User>(\`\${this.apiUrl}/\${id}\`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`);
  }
}

// ── Injecting into component ──────────────────────
@Component({ template: "..." })
export class UserListComponent implements OnInit {
  // Method 1: Constructor injection (traditional)
  constructor(
    private userService: UserService,
    private router:      Router,
  ) {}

  // Method 2: inject() function (Angular 14+, preferred in modern Angular)
  private userService2 = inject(UserService);

  ngOnInit() {
    this.userService.getAll().subscribe(users => this.users = users);
  }
}`,
  },
  {
    q: "What is Angular routing?",
    a: "Angular Router maps URLs to components, enabling navigation in SPAs. Routes are defined as an array of path-component pairs. RouterModule.forRoot() configures the root router. Features include lazy loading, route guards, route parameters, query params, child routes, and navigation extras.",
    code: `import { Routes, RouterModule } from "@angular/router";
import { provideRouter, withPreloading, PreloadAllModules } from "@angular/router";

// ── Route definitions ─────────────────────────────
const routes: Routes = [
  { path: "",             component: HomeComponent,  title: "Home" },
  { path: "about",        component: AboutComponent, title: "About" },

  // Route with parameter
  { path: "users/:id",    component: UserDetailComponent },

  // Lazy-loaded feature module
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
    canActivate:  [AuthGuard],
    canLoad:      [AuthGuard],
    title:        "Admin",
  },

  // Lazy standalone component (Angular 15+)
  {
    path: "settings",
    loadComponent: () => import("./settings/settings.component")
      .then(m => m.SettingsComponent),
  },

  // Child routes
  {
    path:      "users",
    component: UsersLayoutComponent,
    children: [
      { path: "",    component: UserListComponent },
      { path: ":id", component: UserDetailComponent },
    ],
  },

  // Redirect
  { path: "home",      redirectTo: "", pathMatch: "full" },
  { path: "**",        component: NotFoundComponent },  // wildcard
];

// ── bootstrap (standalone) ────────────────────────
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

// ── Template navigation ───────────────────────────
// <a routerLink="/users">Users</a>
// <a [routerLink]="['/users', user.id]">User</a>
// <a routerLink="/users" routerLinkActive="active">Users</a>
// <router-outlet></router-outlet>

// ── Programmatic navigation ───────────────────────
@Component({ template: "" })
export class NavComponent {
  private router = inject(Router);
  private route  = inject(ActivatedRoute);

  goToUser(id: number) {
    this.router.navigate(["/users", id]);
  }
  goWithQuery() {
    this.router.navigate(["/users"], { queryParams: { page: 2, limit: 10 } });
  }
  readParams() {
    this.route.params.subscribe(p => console.log(p["id"]));
    this.route.queryParams.subscribe(q => console.log(q["page"]));
    // Snapshot (once)
    const id = this.route.snapshot.paramMap.get("id");
  }
}`,
  },
  {
    q: "What are Angular lifecycle hooks?",
    a: "Lifecycle hooks allow components and directives to respond to events in their lifecycle — creation, change detection, and destruction. The most important are ngOnInit (after first input binding), ngOnChanges (input changes), ngOnDestroy (cleanup), and ngAfterViewInit (view fully initialized).",
    code: `import {
  Component, OnInit, OnDestroy, OnChanges, SimpleChanges,
  AfterViewInit, AfterViewChecked, AfterContentInit,
  AfterContentChecked, DoCheck, Input, ViewChild, ElementRef
} from "@angular/core";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-lifecycle",
  template: "<div #myDiv>{{ data }}</div>",
})
export class LifecycleComponent
  implements OnInit, OnChanges, DoCheck, AfterContentInit,
             AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy
{
  @Input() userId!: number;
  @ViewChild("myDiv") divRef!: ElementRef;
  private destroy$ = new Subject<void>();
  data = "";

  // 1. constructor - DI only, avoid heavy work
  constructor(private userService: UserService) {
    console.log("1. constructor");
  }

  // 2. ngOnChanges - fires BEFORE ngOnInit if inputs exist
  ngOnChanges(changes: SimpleChanges): void {
    console.log("2. ngOnChanges", changes);
    if (changes["userId"] && !changes["userId"].firstChange) {
      this.loadUser(changes["userId"].currentValue);
    }
    // changes.userId.previousValue, currentValue, firstChange
  }

  // 3. ngOnInit - component initialized, inputs available
  ngOnInit(): void {
    console.log("3. ngOnInit");
    this.loadUser(this.userId);
    // Start subscriptions here (not constructor)
    this.userService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data = data);
  }

  // 4. ngDoCheck - every change detection cycle (use carefully - expensive)
  ngDoCheck(): void { console.log("4. ngDoCheck"); }

  // 5 & 6. After projected content (ng-content)
  ngAfterContentInit():    void { console.log("5. ngAfterContentInit"); }
  ngAfterContentChecked(): void { console.log("6. ngAfterContentChecked"); }

  // 7 & 8. After view (template) fully rendered
  ngAfterViewInit(): void {
    console.log("7. ngAfterViewInit");
    // DOM is ready - access @ViewChild here
    this.divRef.nativeElement.style.color = "red";
  }
  ngAfterViewChecked(): void { console.log("8. ngAfterViewChecked"); }

  // 9. ngOnDestroy - cleanup before removal
  ngOnDestroy(): void {
    console.log("9. ngOnDestroy");
    this.destroy$.next();   // unsubscribe all takeUntil
    this.destroy$.complete();
  }

  private loadUser(id: number) {
    this.userService.getById(id).subscribe(user => this.data = user.name);
  }
}`,
  },
  {
    q: "What are Angular template syntax features?",
    a: "Angular templates extend HTML with binding syntax, directives, pipes, template references, ng-template, ng-container, ng-content, and the new control flow syntax (@if, @for, @switch). Template reference variables provide direct element or component access.",
    code: `@Component({
  template: \`
    <!-- ── Template reference variables ──────────── -->
    <input #nameInput type="text" />
    <button (click)="greet(nameInput.value)">Greet</button>

    <!-- Reference a component instance -->
    <app-form #myForm></app-form>
    <button (click)="myForm.submit()">Submit</button>

    <!-- ── New control flow (Angular 17+) ─────────── -->
    @if (isLoggedIn) {
      <p>Welcome, {{ user.name }}</p>
    } @else if (isGuest) {
      <p>You are a guest</p>
    } @else {
      <a routerLink="/login">Login</a>
    }

    @for (item of items; track item.id) {
      <li>{{ item.name }}</li>
    } @empty {
      <li>No items found</li>
    }

    @switch (status) {
      @case ("active")   { <span class="green">Active</span>   }
      @case ("inactive") { <span class="red">Inactive</span>   }
      @default           { <span>Unknown</span>                }
    }

    <!-- ── ng-template ────────────────────────────── -->
    <ng-template #loadingTpl>
      <app-spinner></app-spinner>
    </ng-template>
    <ng-container *ngTemplateOutlet="loading ? loadingTpl : null"></ng-container>

    <!-- ── ng-content (content projection) ──────────── -->
    <!-- In child component: -->
    <!-- <ng-content></ng-content> -->
    <!-- <ng-content select=".header"></ng-content> -->
    <!-- <ng-content select="[slot='footer']"></ng-content> -->

    <!-- ── Safe navigation operator ─────────────────── -->
    <p>{{ user?.address?.city }}</p>
    <p>{{ user?.getName?.() }}</p>

    <!-- ── Non-null assertion ────────────────────────── -->
    <p>{{ user!.name }}</p>

    <!-- ── $event object ─────────────────────────────── -->
    <input (keyup)="onKey($event)" />
    <button (click)="onClick($event)">Click</button>
  \`,
})
export class TemplateSyntaxComponent {
  isLoggedIn = true;
  isGuest    = false;
  status     = "active";
  user       = { name: "Alice", address: { city: "Paris" } };
  items      = [{ id: 1, name: "Item" }];

  greet(name: string) { alert(\`Hello \${name}!\`); }
  onKey(e: KeyboardEvent) { console.log(e.key); }
  onClick(e: MouseEvent)  { console.log(e.clientX); }
}`,
  },

  // ─── INTERMEDIATE ─────────────────────────────────────────
  {
    q: "What are Angular reactive forms?",
    a: "Reactive forms provide a model-driven approach with explicit control over form data and validation in the component class. FormGroup, FormControl, and FormArray create a form model. Validators can be synchronous or asynchronous. Reactive forms are more scalable and testable than template-driven forms.",
    code: `import {
  FormBuilder, FormGroup, FormArray, FormControl,
  Validators, AbstractControl, ValidationErrors
} from "@angular/forms";
import { inject } from "@angular/core";

@Component({
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" />
      <span *ngIf="f['name'].errors?.['required'] && f['name'].touched">Required</span>
      <span *ngIf="f['name'].errors?.['minlength']">Min 3 chars</span>

      <div formGroupName="address">
        <input formControlName="street" />
        <input formControlName="city" />
      </div>

      <div formArrayName="phones">
        <div *ngFor="let phone of phones.controls; let i = index">
          <input [formControlName]="i" />
          <button type="button" (click)="removePhone(i)">Remove</button>
        </div>
      </div>
      <button type="button" (click)="addPhone()">Add Phone</button>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  \`,
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      name:  ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email], [this.emailExistsValidator()]],
      age:   [null, [Validators.min(0), Validators.max(150)]],
      address: this.fb.group({
        street: ["", Validators.required],
        city:   ["", Validators.required],
        zip:    ["", [Validators.required, Validators.pattern(/^\d{5}$/)]],
      }),
      phones: this.fb.array([this.fb.control("", Validators.required)]),
    }, { validators: this.passwordMatchValidator });

    // Listen to value changes
    this.form.get("email")!.valueChanges.pipe(
      debounceTime(300), distinctUntilChanged()
    ).subscribe(email => console.log("Email changed:", email));
  }

  get f() { return this.form.controls; }
  get phones() { return this.form.get("phones") as FormArray; }

  addPhone()         { this.phones.push(this.fb.control("")); }
  removePhone(i: number) { this.phones.removeAt(i); }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    console.log(this.form.value);
  }

  // Custom validator
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pw  = group.get("password")?.value;
    const pwc = group.get("passwordConfirm")?.value;
    return pw === pwc ? null : { passwordMismatch: true };
  }

  // Async validator
  emailExistsValidator() {
    return (control: AbstractControl) =>
      this.userService.checkEmail(control.value).pipe(
        map(exists => exists ? { emailExists: true } : null),
        catchError(() => of(null))
      );
  }
}`,
  },
  {
    q: "What is RxJS and how is it used in Angular?",
    a: "RxJS (Reactive Extensions for JavaScript) provides observable-based programming. Angular uses RxJS extensively for HTTP requests, routing, forms, and state management. Key concepts: Observable, Subject, operators (map, filter, switchMap, mergeMap, combineLatest), and subscription management.",
    code: `import {
  Observable, Subject, BehaviorSubject, ReplaySubject, combineLatest,
  of, from, fromEvent, interval, forkJoin, merge, concat, EMPTY, throwError
} from "rxjs";
import {
  map, filter, switchMap, mergeMap, concatMap, exhaustMap,
  debounceTime, distinctUntilChanged, takeUntil, take, catchError,
  tap, share, shareReplay, retry, retryWhen, finalize, startWith,
  withLatestFrom, combineLatestWith, scan, reduce, throttleTime
} from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class DataService {
  private http        = inject(HttpClient);
  private destroy$    = new Subject<void>();

  // ── Subject types ─────────────────────────────
  private subject$      = new Subject<string>();          // no initial value
  private behavior$     = new BehaviorSubject<string[]>([]); // has initial value
  private replay$       = new ReplaySubject<string>(3);   // replays last 3 values

  // ── Common operators ──────────────────────────
  searchUsers(term$: Observable<string>): Observable<User[]> {
    return term$.pipe(
      debounceTime(300),        // wait 300ms after last keystroke
      distinctUntilChanged(),   // ignore same consecutive values
      filter(term => term.length >= 2),
      switchMap(term =>         // cancel previous, use latest
        this.http.get<User[]>(\`/api/users?q=\${term}\`).pipe(
          catchError(() => of([])) // return empty on error
        )
      ),
      shareReplay(1),           // cache last result
    );
  }

  // ── Higher-order mapping operators ────────────
  // switchMap:  cancel previous, take latest (search)
  // mergeMap:   run all concurrently (parallel requests)
  // concatMap:  queue, run one at a time in order
  // exhaustMap: ignore new until current completes (submit button)

  loadAll(ids: number[]): Observable<User[]> {
    return from(ids).pipe(
      mergeMap(id => this.http.get<User>(\`/api/users/\${id}\`)),
      // Run all requests in parallel, collect as array
    );
  }

  submitForm(form$: Observable<FormData>): Observable<Response> {
    return form$.pipe(
      exhaustMap(data => this.http.post<Response>("/api/submit", data))
      // Ignore new submits until current one completes
    );
  }

  // ── Combining observables ─────────────────────
  getDashboard(): Observable<Dashboard> {
    return combineLatest([
      this.http.get<User>("/api/user"),
      this.http.get<Stats>("/api/stats"),
      this.http.get<Notification[]>("/api/notifications"),
    ]).pipe(
      map(([user, stats, notifications]) => ({ user, stats, notifications }))
    );
  }

  // ── Cleanup ───────────────────────────────────
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
  },
  {
    q: "What is Angular change detection and how does OnPush work?",
    a: "Angular's change detection updates the view when data changes. The default strategy checks every component on every event. OnPush only checks when input references change, an event fires within the component, async pipe emits, or markForCheck() is called. OnPush significantly improves performance.",
    code: `import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef,
  Input, OnInit, inject
} from "@angular/core";

// ── Default change detection ──────────────────────
@Component({
  selector: "app-default",
  template: "{{ data.name }}",
  changeDetection: ChangeDetectionStrategy.Default, // every CD cycle
})
export class DefaultComponent {
  data = { name: "Alice" };
}

// ── OnPush strategy ───────────────────────────────
@Component({
  selector: "app-optimized",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h2>{{ user.name }}</h2>
    <p>{{ count }}</p>
    <p>{{ data$ | async }}</p>
    <button (click)="increment()">+</button>
  \`,
})
export class OptimizedComponent implements OnInit {
  @Input() user!: User;  // OnPush checks on INPUT REFERENCE change
  count = 0;
  data$ = inject(DataService).stream$; // async pipe triggers CD

  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    // ✅ Triggers CD in OnPush component
    someService.externalEvent$.subscribe(() => {
      this.count++;
      this.cdr.markForCheck(); // schedule view check
    });
  }

  increment() {
    this.count++; // ✅ DOM event within component triggers CD
  }

  // ── Common OnPush pitfall ──────────────────────
  // ❌ Mutating an object input - OnPush won't detect this
  badUpdate() {
    this.user.name = "Bob"; // mutation - same reference, no CD!
  }

  // ✅ Replace the reference - triggers OnPush
  goodUpdate() {
    this.user = { ...this.user, name: "Bob" }; // new reference ✅
  }
}

// ── Signals (Angular 16+) - fine-grained reactivity ─
import { signal, computed, effect } from "@angular/core";

@Component({
  selector: "app-signals",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <p>Count: {{ count() }}</p>
    <p>Double: {{ doubled() }}</p>
    <button (click)="increment()">+</button>
  \`,
})
export class SignalsComponent {
  count   = signal(0);
  doubled = computed(() => this.count() * 2);

  constructor() {
    effect(() => console.log("Count changed:", this.count()));
  }

  increment() { this.count.update(c => c + 1); }
}`,
  },
  {
    q: "What are Angular route guards?",
    a: "Route guards control navigation to and from routes. Angular provides CanActivate (can enter?), CanActivateChild (can enter child?), CanDeactivate (can leave?), CanLoad/CanMatch (can load lazy module?), and Resolve (fetch data before activating). Modern Angular uses functional guards.",
    code: `import { inject } from "@angular/core";
import { Router, CanActivateFn, CanDeactivateFn, ResolveFn } from "@angular/router";
import { map, tap } from "rxjs";

// ── Modern functional guards (Angular 15+) ────────

// CanActivate - can user access this route?
export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn$.pipe(
    map(isLoggedIn => {
      if (isLoggedIn) return true;
      router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
      return false;
    })
  );
};

// Role-based guard
export const adminGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.hasRole("admin")) return true;
  router.navigate(["/forbidden"]);
  return false;
};

// CanDeactivate - warn before leaving unsaved form
export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}
export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> =
  (component) => {
    if (!component.hasUnsavedChanges()) return true;
    return confirm("You have unsaved changes. Leave anyway?");
  };

// Resolve - prefetch data before activating route
export const userResolver: ResolveFn<User> = (route) => {
  const userService = inject(UserService);
  const router      = inject(Router);
  const id          = Number(route.paramMap.get("id"));

  return userService.getById(id).pipe(
    catchError(() => {
      router.navigate(["/not-found"]);
      return EMPTY;
    })
  );
};

// ── Apply to routes ───────────────────────────────
const routes: Routes = [
  {
    path:        "dashboard",
    component:   DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path:             "settings",
        component:        SettingsComponent,
        canDeactivate:    [unsavedChangesGuard],
      },
    ],
  },
  {
    path:        "users/:id",
    component:   UserDetailComponent,
    canActivate: [authGuard],
    resolve:     { user: userResolver }, // data available as route.data["user"]
  },
  {
    path:        "admin",
    loadChildren:() => import("./admin/admin.module").then(m => m.AdminModule),
    canActivate: [authGuard, adminGuard],
    canMatch:    [() => inject(AuthService).hasRole("admin")],
  },
];`,
  },
  {
    q: "What are Angular HTTP interceptors?",
    a: "HTTP interceptors intercept outgoing requests and incoming responses to add headers, handle errors, show loading states, refresh tokens, cache responses, and log requests. They form a pipeline that each request passes through.",
    code: `import {
  HttpInterceptorFn, HttpRequest, HttpHandlerFn,
  HttpErrorResponse, HttpEvent, HttpResponse
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, throwError, catchError, tap, finalize, retry } from "rxjs";

// ── Auth interceptor ──────────────────────────────
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth  = inject(AuthService);
  const token = auth.getToken();

  if (!token) return next(req);

  const authReq = req.clone({
    setHeaders: { Authorization: \`Bearer \${token}\` }
  });
  return next(authReq);
};

// ── Error handling interceptor ────────────────────
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  const notify = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          auth.logout();
          router.navigate(["/login"]);
          break;
        case 403:
          router.navigate(["/forbidden"]);
          break;
        case 404:
          notify.error("Resource not found");
          break;
        case 500:
          notify.error("Server error. Please try again.");
          break;
      }
      return throwError(() => error);
    })
  );
};

// ── Loading interceptor ───────────────────────────
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  loading.show();
  return next(req).pipe(
    finalize(() => loading.hide())
  );
};

// ── Caching interceptor ───────────────────────────
export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cache = inject(CacheService);
  if (req.method !== "GET") return next(req);

  const cached = cache.get(req.url);
  if (cached) return of(cached);

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) cache.set(req.url, event);
    })
  );
};

// ── Register interceptors (standalone) ───────────
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor])
    ),
  ],
});`,
  },
  {
    q: "What is Angular content projection (ng-content)?",
    a: "Content projection passes template content from a parent into a child component's view using ng-content. Single-slot projection inserts all children. Multi-slot projection uses select attribute to target specific content by CSS selector. ng-template can project reusable templates.",
    code: `// ── Single slot projection ────────────────────────
@Component({
  selector: "app-card",
  template: \`
    <div class="card">
      <div class="card-body">
        <ng-content></ng-content>  <!-- all projected content goes here -->
      </div>
    </div>
  \`,
})
export class CardComponent {}
// Usage: <app-card><p>Card content here</p></app-card>

// ── Multi-slot projection ─────────────────────────
@Component({
  selector: "app-layout",
  template: \`
    <header><ng-content select=".header"></ng-content></header>
    <main><ng-content select="main, [slot=main]"></ng-content></main>
    <aside><ng-content select="aside, [slot=sidebar]"></ng-content></aside>
    <footer><ng-content select=".footer"></ng-content></footer>
    <ng-content></ng-content>  <!-- catch-all for unmatched content -->
  \`,
})
export class LayoutComponent {}

// Usage:
// <app-layout>
//   <div class="header"><h1>Title</h1></div>
//   <main>Main content</main>
//   <aside slot="sidebar">Sidebar</aside>
//   <div class="footer">Footer</div>
// </app-layout>

// ── ngTemplateOutlet - project templates ──────────
@Component({
  selector: "app-list",
  template: \`
    <ul>
      <li *ngFor="let item of items">
        <ng-container
          *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }">
        </ng-container>
      </li>
    </ul>
    <!-- Default template if none provided -->
    <ng-template #defaultTemplate let-item>{{ item.name }}</ng-template>
  \`,
})
export class ListComponent {
  @Input() items: any[] = [];
  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;
}

// Usage with custom template:
// <app-list [items]="users">
//   <ng-template let-user let-index="index">
//     <span>{{ index + 1 }}. {{ user.name }}</span>
//   </ng-template>
// </app-list>`,
  },
  {
    q: "What are Angular ViewChild and ContentChild decorators?",
    a: "ViewChild queries for a single element or directive in the component's own template. ViewChildren queries for multiple items as a QueryList. ContentChild and ContentChildren query projected content (from parent). These are available after view/content initialization.",
    code: `import {
  Component, ViewChild, ViewChildren, ContentChild, ContentChildren,
  AfterViewInit, AfterContentInit, ElementRef, QueryList, TemplateRef
} from "@angular/core";

@Component({
  selector: "app-parent",
  template: \`
    <!-- ViewChild targets -->
    <input #nameInput type="text" />
    <canvas #myCanvas></canvas>
    <app-child #childComp [data]="data"></app-child>
    <button #btn *ngFor="let b of buttons">{{ b }}</button>

    <!-- Content projection slot -->
    <ng-content></ng-content>
  \`,
})
export class ParentComponent implements AfterViewInit, AfterContentInit {
  // ── ViewChild ────────────────────────────────
  @ViewChild("nameInput")
  nameInput!: ElementRef<HTMLInputElement>;    // DOM element

  @ViewChild("myCanvas")
  canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild("childComp")
  child!: ChildComponent;                     // component instance

  @ViewChild("childComp", { read: ElementRef })
  childEl!: ElementRef;                       // element of component

  // Static: true = available in ngOnInit (no *ngIf/*ngFor)
  @ViewChild("nameInput", { static: true })
  staticInput!: ElementRef;

  // ── ViewChildren ─────────────────────────────
  @ViewChildren("btn")
  buttons!: QueryList<ElementRef>;            // all #btn elements

  @ViewChildren(ChildComponent)
  children!: QueryList<ChildComponent>;       // all child components

  // ── ContentChild (projected content) ─────────
  @ContentChild("projectedEl")
  projected!: ElementRef;

  @ContentChild(TemplateRef)
  template!: TemplateRef<any>;

  @ContentChildren(ChildComponent)
  projectedChildren!: QueryList<ChildComponent>;

  ngAfterViewInit(): void {
    // ViewChild available here
    this.nameInput.nativeElement.focus();
    this.child.doSomething();

    // React to list changes
    this.buttons.changes.subscribe(list => {
      console.log("Buttons changed:", list.length);
    });
  }

  ngAfterContentInit(): void {
    // ContentChild available here
    this.projectedChildren.forEach(c => c.highlight());
  }
}`,
  },
  {
    q: "What is the Angular async pipe and why is it preferred?",
    a: "The async pipe subscribes to an Observable or Promise, returns its latest value, and automatically unsubscribes when the component is destroyed. It prevents memory leaks, handles null safely, and triggers change detection in OnPush components — making it the preferred way to display async data.",
    code: `import { Component, OnInit, inject } from "@angular/core";
import { Observable, combineLatest, BehaviorSubject } from "rxjs";
import { switchMap, map, startWith } from "rxjs/operators";

@Component({
  selector: "app-users",
  template: \`
    <!-- ── Basic async pipe ──────────────────────── -->
    <div *ngIf="users$ | async as users; else loading">
      <p>Total: {{ users.length }}</p>
      <li *ngFor="let user of users">{{ user.name }}</li>
    </div>
    <ng-template #loading><app-spinner></app-spinner></ng-template>

    <!-- ── With @if (Angular 17+) ────────────────── -->
    @if (users$ | async; as users) {
      <li *ngFor="let u of users">{{ u.name }}</li>
    } @else {
      <app-spinner />
    }

    <!-- ── Multiple observables ──────────────────── -->
    <ng-container *ngIf="vm$ | async as vm">
      <h1>{{ vm.user.name }}</h1>
      <p>Posts: {{ vm.postCount }}</p>
      <span *ngFor="let n of vm.notifications">{{ n.message }}</span>
    </ng-container>

    <!-- ── Loading/error states ──────────────────── -->
    <ng-container [ngSwitch]="(dataState$ | async)?.status">
      <app-spinner  *ngSwitchCase="'loading'"></app-spinner>
      <app-error    *ngSwitchCase="'error'"    [message]="(dataState$ | async)?.error">
      </app-error>
      <app-data-list *ngSwitchCase="'success'" [data]="(dataState$ | async)?.data">
      </app-data-list>
    </ng-container>
  \`,
})
export class UsersComponent {
  private userService = inject(UserService);
  private search$     = new BehaviorSubject<string>("");

  // ✅ async pipe auto-unsubscribes - no manual subscription needed
  users$: Observable<User[]> = this.userService.getAll();

  // ✅ Reactive search
  filteredUsers$ = this.search$.pipe(
    switchMap(term => this.userService.search(term)),
    startWith([]),
  );

  // ✅ Combined view model (avoids multiple async pipes)
  vm$ = combineLatest({
    user:          this.userService.currentUser$,
    postCount:     this.postService.count$,
    notifications: this.notifService.unread$,
  });

  // ❌ Manual subscription (must remember to unsubscribe)
  ngOnInit() {
    this.userService.getAll().subscribe(users => this.users = users);
    // If you forget: this.sub.unsubscribe() → memory leak
  }
}`,
  },
  {
    q: "What are Angular environment files and configuration?",
    a: "Angular environment files provide environment-specific configuration (dev, production, staging). Angular CLI replaces environment.ts with environment.prod.ts during production builds via file replacement in angular.json. Angular 15+ uses application builder with different config.",
    code: `// ── src/environments/environment.ts (development) ──
export const environment = {
  production:  false,
  apiUrl:      "http://localhost:3000/api",
  wsUrl:       "ws://localhost:3000",
  logLevel:    "debug",
  features: {
    darkMode:   true,
    betaUsers:  true,
  },
};

// ── src/environments/environment.prod.ts ────────────
export const environment = {
  production:  true,
  apiUrl:      "https://api.example.com",
  wsUrl:       "wss://api.example.com",
  logLevel:    "error",
  features: {
    darkMode:   true,
    betaUsers:  false,
  },
};

// ── angular.json file replacement config ────────────
// "configurations": {
//   "production": {
//     "fileReplacements": [
//       {
//         "replace": "src/environments/environment.ts",
//         "with":    "src/environments/environment.prod.ts"
//       }
//     ],
//     "optimization":   true,
//     "sourceMap":      false,
//     "namedChunks":    false,
//   }
// }

// ── Using environment in service ─────────────────
import { environment } from "../environments/environment";

@Injectable({ providedIn: "root" })
export class ApiService {
  private baseUrl = environment.apiUrl;

  getData() {
    return this.http.get(\`\${this.baseUrl}/data\`);
  }
}

// ── Build commands ────────────────────────────────
// ng build                    ← development
// ng build --configuration production  ← production
// ng serve                    ← dev server
// ng serve --configuration staging     ← staging server

// ── APP_INITIALIZER for runtime config ────────────
@Injectable({ providedIn: "root" })
export class ConfigService {
  private config: AppConfig = {} as AppConfig;
  load(): Promise<void> {
    return fetch("/assets/config.json")
      .then(r => r.json())
      .then(config => { this.config = config; });
  }
  get(key: keyof AppConfig) { return this.config[key]; }
}

// providers: [
//   { provide: APP_INITIALIZER, useFactory: (cs: ConfigService) =>
//     () => cs.load(), deps: [ConfigService], multi: true }
// ]`,
  },

  // ─── INTERMEDIATE-ADVANCED ─────────────────────────────────
  {
    q: "What is Angular state management with NgRx?",
    a: "NgRx is a Redux-inspired state management library for Angular using RxJS. It has Store (single source of truth), Actions (events), Reducers (pure state transformers), Effects (side effects), and Selectors (derived data). It provides predictable state management with time-travel debugging.",
    code: `import { createAction, createReducer, createSelector,
         createFeatureSelector, createEffect, props, on } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";

// ── Actions ───────────────────────────────────────
export const loadUsers     = createAction("[Users] Load Users");
export const loadUsersSuccess = createAction("[Users] Load Users Success",
  props<{ users: User[] }>());
export const loadUsersFail = createAction("[Users] Load Users Fail",
  props<{ error: string }>());
export const addUser       = createAction("[Users] Add User",    props<{ user: User }>());
export const deleteUser    = createAction("[Users] Delete User", props<{ id: number }>());
export const selectUser    = createAction("[Users] Select User", props<{ id: number | null }>());

// ── State interface ───────────────────────────────
interface UsersState {
  users:      User[];
  selectedId: number | null;
  loading:    boolean;
  error:      string | null;
}
const initialState: UsersState = {
  users: [], selectedId: null, loading: false, error: null
};

// ── Reducer ───────────────────────────────────────
export const usersReducer = createReducer(initialState,
  on(loadUsers,        state => ({ ...state, loading: true, error: null })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(loadUsersFail,    (state, { error }) => ({ ...state, error, loading: false })),
  on(addUser,    (state, { user })    => ({ ...state, users: [...state.users, user] })),
  on(deleteUser, (state, { id })      => ({ ...state, users: state.users.filter(u => u.id !== id) })),
  on(selectUser, (state, { id })      => ({ ...state, selectedId: id })),
);

// ── Selectors ─────────────────────────────────────
const selectUsersFeature = createFeatureSelector<UsersState>("users");
export const selectAllUsers   = createSelector(selectUsersFeature, s => s.users);
export const selectLoading    = createSelector(selectUsersFeature, s => s.loading);
export const selectError      = createSelector(selectUsersFeature, s => s.error);
export const selectSelectedId = createSelector(selectUsersFeature, s => s.selectedId);
export const selectSelectedUser = createSelector(
  selectAllUsers, selectSelectedId,
  (users, id) => users.find(u => u.id === id) ?? null
);
export const selectActiveUsers = createSelector(
  selectAllUsers, users => users.filter(u => u.active)
);

// ── Effects ───────────────────────────────────────
@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private http     = inject(HttpClient);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.http.get<User[]>("/api/users").pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(err => of(loadUsersFail({ error: err.message })))
        )
      )
    )
  );
}

// ── Component usage ───────────────────────────────
@Component({ template: \`
  <li *ngFor="let user of users$ | async">{{ user.name }}</li>
  <ng-container *ngIf="loading$ | async"><app-spinner /></ng-container>
\`})
export class UsersComponent {
  private store = inject(Store);
  users$   = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectLoading);

  ngOnInit() { this.store.dispatch(loadUsers()); }
  delete(id: number) { this.store.dispatch(deleteUser({ id })); }
}`,
  },
  {
    q: "What are Angular signals and the new reactivity model?",
    a: "Angular 16+ introduced Signals as a fine-grained reactivity primitive. Signals are reactive values that track dependencies and notify consumers when they change. They work with computed() for derived values, effect() for side effects, and integrate with the template for zoneless change detection.",
    code: `import {
  signal, computed, effect, input, output, model,
  Signal, WritableSignal, linkedSignal, toSignal, toObservable
} from "@angular/core";
import { toSignal, toObservable } from "@angular/core/rxjs-interop";

@Component({
  selector:    "app-counter",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <p>Count:  {{ count() }}</p>
    <p>Double: {{ doubled() }}</p>
    <p>Status: {{ status() }}</p>
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
    <button (click)="reset()">Reset</button>
  \`,
})
export class CounterComponent {
  // ── Writable signal ───────────────────────────
  count = signal(0);

  // ── Computed signal (derived, read-only) ──────
  doubled = computed(() => this.count() * 2);
  status  = computed(() => this.count() > 10 ? "High" : "Normal");

  // ── Effect (side effect when signals change) ──
  constructor() {
    effect(() => {
      console.log("Count changed to:", this.count()); // auto-tracks count
      localStorage.setItem("count", String(this.count()));
    });
  }

  increment() { this.count.update(c => c + 1); }   // update based on previous
  decrement() { this.count.update(c => c - 1); }
  reset()     { this.count.set(0); }                // set to specific value
  add(n: number) { this.count.update(c => c + n); }
}

// ── Signal inputs (Angular 17.1+) ─────────────────
@Component({ template: "{{ user().name }}" })
export class UserCardComponent {
  user     = input.required<User>();            // required signal input
  theme    = input<"dark" | "light">("light");  // optional with default
  selected = output<User>();                    // output event

  // Two-way binding
  value    = model<string>("");                 // model (two-way signal)
}

// ── Convert Observable ↔ Signal ───────────────────
@Component({ template: "{{ users() | json }}" })
export class DataComponent {
  private userService = inject(UserService);

  // Observable → Signal
  users = toSignal(this.userService.getAll(), { initialValue: [] });

  // Signal → Observable
  count   = signal(0);
  count$  = toObservable(this.count); // Observable<number>
}

// ── linkedSignal (Angular 19+) ────────────────────
@Component({ template: "" })
export class LinkedComponent {
  items    = signal<Item[]>([]);
  selected = linkedSignal<Item[], Item | null>({
    source: this.items,
    computation: (items) => items[0] ?? null, // auto-updates when items changes
  });
}`,
  },
  {
    q: "What is Angular Universal (Server-Side Rendering)?",
    a: "Angular Universal renders Angular apps on the server using Node.js, sending HTML to the client for faster initial load and better SEO. The app hydrates on the client, becoming a full SPA. Angular 17+ uses a unified application builder with built-in SSR support.",
    code: `// ── Setup (Angular 17+ with new app builder) ───────
// ng add @angular/ssr

// ── app.config.ts ─────────────────────────────────
import { ApplicationConfig } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(), // enables hydration
  ],
};

// ── app.config.server.ts ──────────────────────────
import { mergeApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};
export const config = mergeApplicationConfig(appConfig, serverConfig);

// ── server.ts ─────────────────────────────────────
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bootstrap from "./src/main.server";
import { ngExpressEngine } from "@nguniversal/express-engine";

const app     = express();
const distDir = dirname(fileURLToPath(import.meta.url));

app.engine("html", ngExpressEngine({ bootstrap }));
app.set("view engine", "html");
app.set("views", distDir);

app.get("*.*", express.static(join(distDir, "browser")));
app.get("*", (req, res) => res.render("index", { req }));

export default app;

// ── Handling browser-only APIs ────────────────────
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PlatformService {
  private platformId = inject(PLATFORM_ID);

  get isBrowser() { return isPlatformBrowser(this.platformId); }
  get isServer()  { return isPlatformServer(this.platformId); }

  getLocalStorage(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }
}

// ── transferState - pass server data to client ────
import { TransferState, makeStateKey } from "@angular/core";

const USERS_KEY = makeStateKey<User[]>("users");

@Injectable({ providedIn: "root" })
export class SsrUserService {
  private state = inject(TransferState);

  getUsers(): Observable<User[]> {
    const cached = this.state.get(USERS_KEY, null);
    if (cached) return of(cached);

    return this.http.get<User[]>("/api/users").pipe(
      tap(users => this.state.set(USERS_KEY, users))
    );
  }
}`,
  },
  {
    q: "What are Angular performance optimization techniques?",
    a: "Angular performance optimization includes OnPush change detection, trackBy for lists, lazy loading routes and images, virtual scrolling, memoized pipes, avoiding subscriptions without cleanup, deferrable views, and signals. The profiler identifies bottlenecks.",
    code: `// ── 1. OnPush + Signals ───────────────────────────
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class OptimizedComponent { count = signal(0); }

// ── 2. trackBy for *ngFor ─────────────────────────
@Component({
  template: \`<li *ngFor="let item of items; trackBy: trackId">{{ item.name }}</li>\`
})
export class ListComponent {
  items = [...];
  trackId = (_: number, item: Item) => item.id; // prevent re-rendering unchanged items
}

// ── 3. Lazy loading routes ────────────────────────
const routes = [
  { path: "admin",    loadComponent: () => import("./admin.component").then(m => m.AdminComponent) },
  { path: "reports",  loadChildren:  () => import("./reports/routes").then(m => m.REPORT_ROUTES) },
];

// ── 4. Deferrable views (@defer - Angular 17+) ────
@Component({
  template: \`
    <!-- Defer heavy component loading -->
    @defer (on viewport) {
      <app-heavy-chart [data]="data" />
    } @placeholder {
      <div class="chart-skeleton">Loading chart...</div>
    } @loading (minimum 500ms) {
      <app-spinner />
    } @error {
      <p>Failed to load chart</p>
    }

    @defer (on idle) {
      <app-recommendation-engine />
    }

    @defer (on interaction) {
      <app-comments [postId]="postId" />
    }

    @defer (when isLoggedIn) {
      <app-user-dashboard />
    }
  \`
})
export class PageComponent { isLoggedIn = signal(false); }

// ── 5. Virtual scrolling (CDK) ────────────────────
@Component({
  template: \`
    <cdk-virtual-scroll-viewport itemSize="50" style="height: 500px">
      <div *cdkVirtualFor="let item of items">{{ item.name }}</div>
    </cdk-virtual-scroll-viewport>
  \`,
})
export class BigListComponent { items = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: \`Item \${i}\` })); }

// ── 6. Pure pipe (memoized) ───────────────────────
@Pipe({ name: "expensiveCalc", pure: true }) // pure = cached by input
export class ExpensiveCalcPipe implements PipeTransform {
  transform(value: number[]): number {
    return value.reduce((sum, n) => sum + n, 0); // only recalculated when value changes
  }
}

// ── 7. preloadStrategy ────────────────────────────
provideRouter(routes, withPreloading(PreloadAllModules))`,
  },
  {
    q: "What are Angular animations?",
    a: "Angular animations use the Web Animations API through the @angular/animations package. Animations are defined in component metadata using trigger(), state(), style(), animate(), transition(), and keyframes(). They can be triggered by state changes, route transitions, or structural directives.",
    code: `import {
  trigger, state, style, animate, transition,
  keyframes, query, stagger, animateChild, group, sequence
} from "@angular/animations";

@Component({
  selector: "app-animated",
  animations: [
    // ── Simple state animation ─────────────────
    trigger("openClose", [
      state("open",   style({ height: "*",   opacity: 1 })),
      state("closed", style({ height: "0px", opacity: 0, overflow: "hidden" })),
      transition("open <=> closed", animate("400ms ease-in-out")),
    ]),

    // ── Enter/leave animations ─────────────────
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-20px)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ opacity: 0, transform: "translateY(-20px)" })),
      ]),
    ]),

    // ── Keyframe animation ─────────────────────
    trigger("bounce", [
      transition("* => bouncing", [
        animate("600ms", keyframes([
          style({ transform: "translateY(0)",    offset: 0 }),
          style({ transform: "translateY(-30px)", offset: 0.4 }),
          style({ transform: "translateY(0)",    offset: 0.7 }),
          style({ transform: "translateY(-15px)", offset: 0.85 }),
          style({ transform: "translateY(0)",    offset: 1 }),
        ])),
      ]),
    ]),

    // ── List stagger animation ─────────────────
    trigger("listAnimation", [
      transition("* => *", [
        query(":enter", [
          style({ opacity: 0, transform: "translateX(-20px)" }),
          stagger(80, [
            animate("300ms ease-out",
              style({ opacity: 1, transform: "translateX(0)" })),
          ]),
        ], { optional: true }),
        query(":leave", [
          stagger(50, [animate("200ms ease-in", style({ opacity: 0 }))]),
        ], { optional: true }),
      ]),
    ]),
  ],
  template: \`
    <div [@openClose]="isOpen ? 'open' : 'closed'">Content</div>
    <div *ngFor="let item of items" [@fadeInOut]>{{ item.name }}</div>
    <ul [@listAnimation]="items.length">
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>
  \`,
})
export class AnimatedComponent {
  isOpen = true;
  items  = ["Item 1", "Item 2", "Item 3"];
  toggle() { this.isOpen = !this.isOpen; }
}`,
  },
  {
    q: "What is Angular CDK (Component Dev Kit)?",
    a: "The Angular CDK provides low-level primitives for building custom UI components — overlay positioning, drag and drop, virtual scrolling, accessibility, portals, layout, clipboard, bidirectional text, and more. It is the foundation Angular Material is built on.",
    code: `import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem }
  from "@angular/cdk/drag-drop";
import { ScrollingModule }    from "@angular/cdk/scrolling";
import { OverlayModule, Overlay, OverlayRef } from "@angular/cdk/overlay";
import { PortalModule, ComponentPortal } from "@angular/cdk/portal";
import { A11yModule, FocusTrap, FocusTrapFactory } from "@angular/cdk/a11y";
import { ClipboardModule }    from "@angular/cdk/clipboard";
import { BreakpointObserver } from "@angular/cdk/layout";

// ── Drag and Drop ─────────────────────────────────
@Component({
  template: \`
    <div cdkDropList (cdkDropListDropped)="drop($event)">
      <div *ngFor="let item of items" cdkDrag>{{ item }}</div>
    </div>

    <!-- Transfer between lists -->
    <div cdkDropList #list1="cdkDropList" [cdkDropListConnectedTo]="[list2]"
         (cdkDropListDropped)="drop($event)">
      <div *ngFor="let item of listA" cdkDrag>{{ item }}</div>
    </div>
    <div cdkDropList #list2="cdkDropList" (cdkDropListDropped)="drop($event)">
      <div *ngFor="let item of listB" cdkDrag>{{ item }}</div>
    </div>
  \`,
})
export class DragComponent {
  items = ["Item 1", "Item 2", "Item 3"];
  listA = ["A1", "A2"];
  listB = ["B1", "B2"];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }
}

// ── Overlay (custom tooltips/dropdowns) ───────────
@Injectable({ providedIn: "root" })
export class TooltipService {
  private overlay = inject(Overlay);

  show(origin: ElementRef, message: string): OverlayRef {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions([{
        originX: "center", originY: "bottom",
        overlayX: "center", overlayY: "top",
      }]);
    const ref = this.overlay.create({ positionStrategy });
    const portal = new ComponentPortal(TooltipComponent);
    const instance = ref.attach(portal);
    instance.setInput("message", message);
    return ref;
  }
}

// ── Responsive breakpoints ────────────────────────
@Injectable({ providedIn: "root" })
export class ResponsiveService {
  private bp = inject(BreakpointObserver);

  isMobile$ = this.bp.observe(["(max-width: 768px)"]).pipe(
    map(result => result.matches)
  );
}`,
  },

  // ─── ADVANCED ───────────────────────────────────────────────
  {
    q: "What is Zone.js and how does Angular use it?",
    a: "Zone.js monkey-patches asynchronous browser APIs (setTimeout, Promises, XHR, DOM events) to intercept them. Angular's NgZone uses this to know when async operations complete and trigger change detection. Zoneless Angular (Angular 18+) removes this dependency using signals.",
    code: `import { NgZone, inject, Component } from "@angular/core";

// ── Zone.js wraps async APIs ──────────────────────
// Zone.js intercepts:
// setTimeout, setInterval, requestAnimationFrame
// Promise, fetch, XMLHttpRequest
// DOM event listeners (addEventListener)

// Angular creates a zone called "angular zone"
// When async ops complete inside this zone, Angular runs CD

@Component({ template: "{{ message }}" })
export class ZoneComponent {
  message    = "Initial";
  private ngZone = inject(NgZone);

  // ✅ Inside Angular zone - triggers CD automatically
  updateInsideZone() {
    setTimeout(() => {
      this.message = "Updated"; // CD runs automatically
    }, 1000);
  }

  // Running heavy computation outside zone for performance
  runHeavyTask() {
    this.ngZone.runOutsideAngular(() => {
      // Long computation - doesn't trigger CD on every tick
      const result = heavyComputation();
      // Run back inside zone to update UI
      this.ngZone.run(() => {
        this.message = \`Result: \${result}\`;
      });
    });
  }

  // Using third-party library that triggers too many updates
  initThirdPartyLib() {
    this.ngZone.runOutsideAngular(() => {
      // Chart.js, D3, etc. - lots of events/callbacks
      const chart = new Chart(canvas, options);
      chart.on("mousemove", () => {
        // Don't trigger CD on every mouse move
      });
    });
  }
}

// ── Zoneless Angular (Angular 18+) ───────────────
// bootstrap without zone.js:
bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(), // Angular 18+
  ],
});

// With zoneless, use signals for reactivity:
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "{{ count() }}",
})
export class ZonelessComponent {
  count = signal(0);
  increment() { this.count.update(c => c + 1); } // ✅ signals trigger CD
}`,
  },
  {
    q: "What are Angular custom decorators and metadata reflection?",
    a: "Custom decorators extend Angular's metadata system. Class decorators modify constructor behavior. Property decorators can add validation or observable behavior. Parameter decorators influence DI. With reflect-metadata, decorators access TypeScript type information at runtime.",
    code: `import "reflect-metadata";

// ── Custom class decorator ────────────────────────
function AutoUnsubscribe(constructor: Function) {
  const originalDestroy = constructor.prototype.ngOnDestroy;
  constructor.prototype.ngOnDestroy = function() {
    for (const prop of Object.keys(this)) {
      const property = this[prop];
      if (property && typeof property.unsubscribe === "function") {
        property.unsubscribe();
      }
    }
    if (originalDestroy) originalDestroy.call(this);
  };
}

@Component({ selector: "app-demo", template: "" })
@AutoUnsubscribe  // automatically unsubscribes all Subscription properties
export class DemoComponent {
  sub1 = someObservable$.subscribe();
  sub2 = anotherObservable$.subscribe();
  // ngOnDestroy auto-called by AutoUnsubscribe
}

// ── Property decorator for memoization ───────────
function Memoize() {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const cache  = new WeakMap();
    const getter = descriptor.get!;
    descriptor.get = function() {
      if (cache.has(this)) return cache.get(this);
      const result = getter.call(this);
      cache.set(this, result);
      return result;
    };
    return descriptor;
  };
}

// ── Custom inject decorator ───────────────────────
function LocalStorage(key: string) {
  return function(target: any, propKey: string) {
    Object.defineProperty(target, propKey, {
      get() { return JSON.parse(localStorage.getItem(key) ?? "null"); },
      set(value) { localStorage.setItem(key, JSON.stringify(value)); },
    });
  };
}

class UserPreferences {
  @LocalStorage("theme")    theme!:    string;
  @LocalStorage("language") language!: string;
}

// ── Reflect metadata ──────────────────────────────
function Injectable2() {
  return function(target: any) {
    // Get constructor parameter types via TypeScript emit
    const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
    Reflect.defineMetadata("injectable:params", paramTypes, target);
  };
}

@Injectable2()
class MyService {
  constructor(private http: HttpClient, private router: Router) {}
}
const params = Reflect.getMetadata("injectable:params", MyService);
// [HttpClient, Router]`,
  },
  {
    q: "What is Angular Element (Custom Elements) and micro-frontends?",
    a: "Angular Elements converts Angular components to native Web Components (Custom Elements). They work in any HTML page or framework. Micro-frontends use Angular Elements to compose applications from independently developed parts, enabling team autonomy and technology diversity.",
    code: `import { createCustomElement } from "@angular/elements";
import { createApplication }    from "@angular/platform-browser";
import { provideZoneChangeDetection } from "@angular/core";

// ── Define the component ──────────────────────────
@Component({
  selector:   "app-user-widget",
  standalone: true,
  template: \`
    <div class="widget">
      <h2>{{ name }}</h2>
      <p>Role: {{ role }}</p>
      <button (click)="action.emit(name)">Action</button>
    </div>
  \`,
})
export class UserWidgetComponent {
  @Input() name  = "Unknown";
  @Input() role  = "User";
  @Output() action = new EventEmitter<string>();
}

// ── Register as Custom Element ────────────────────
async function registerElements() {
  const app = await createApplication({
    providers: [provideZoneChangeDetection()],
  });

  const UserWidget = createCustomElement(UserWidgetComponent, {
    injector: app.injector,
  });

  customElements.define("user-widget", UserWidget);
}
registerElements();

// ── Use anywhere in HTML ──────────────────────────
// <user-widget name="Alice" role="Admin"></user-widget>
// <user-widget name="Bob"></user-widget>

// Works in React:
// <user-widget name={user.name} ref={el => el?.addEventListener("action", handler)} />

// ── Micro-frontend shell ──────────────────────────
@Component({
  selector: "app-shell",
  template: \`
    <!-- Load remote micro-frontends -->
    <app-navigation></app-navigation>   <!-- Team A -->
    <product-catalog></product-catalog>  <!-- Team B -->
    <checkout-widget></checkout-widget>  <!-- Team C -->
    <user-profile></user-profile>        <!-- Team D -->
  \`,
})
export class ShellComponent {
  ngOnInit() {
    // Dynamically load micro-frontend bundles
    this.loadMFE("https://team-b.example.com/product-catalog.js");
    this.loadMFE("https://team-c.example.com/checkout.js");
  }

  private loadMFE(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script   = document.createElement("script");
      script.src     = url;
      script.onload  = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}`,
  },
  {
    q: "How do you implement a custom form control with ControlValueAccessor?",
    a: "ControlValueAccessor is an interface that bridges custom components with Angular's form system. Implementing it allows your component to work with both reactive (FormControl) and template-driven (ngModel) forms, receiving values and reporting changes back to the form.",
    code: `import {
  Component, forwardRef, Input, OnInit, inject
} from "@angular/core";
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
  AbstractControl, ValidationErrors, Validator
} from "@angular/forms";

@Component({
  selector: "app-star-rating",
  template: \`
    <div class="stars" [attr.aria-label]="'Rating: ' + value + ' of 5'">
      <button
        *ngFor="let star of [1,2,3,4,5]"
        type="button"
        [class.filled]="star <= value"
        [disabled]="disabled"
        (click)="onRate(star)"
        (keydown.enter)="onRate(star)"
        [attr.aria-label]="'Rate ' + star + ' stars'"
      >★</button>
    </div>
    <span *ngIf="required && !value" class="error">Rating required</span>
  \`,
  providers: [
    {
      provide:    NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true,
    },
    {
      provide:    NG_VALIDATORS,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true,
    },
  ],
})
export class StarRatingComponent implements ControlValueAccessor, Validator, OnInit {
  @Input() required = false;
  value    = 0;
  disabled = false;

  // Functions provided by Angular forms
  private onChange: (val: number) => void   = () => {};
  private onTouched: ()           => void   = () => {};
  private onValidatorChange: ()   => void   = () => {};

  // Called by Angular when form value changes programmatically
  writeValue(value: number): void {
    this.value = value ?? 0;
  }

  // Call when user changes value
  registerOnChange(fn: (val: number) => void): void {
    this.onChange = fn;
  }

  // Call when user touches the control
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Called when form is disabled/enabled
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Validator
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && !control.value) {
      return { required: true };
    }
    return null;
  }
  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  onRate(star: number): void {
    if (this.disabled) return;
    this.value = star;
    this.onChange(star);  // notify form
    this.onTouched();     // mark touched
  }
}

// ── Usage in reactive form ────────────────────────
// form = this.fb.group({ rating: [0, Validators.required] });
// <app-star-rating formControlName="rating" [required]="true"></app-star-rating>

// ── Usage with ngModel ────────────────────────────
// <app-star-rating [(ngModel)]="myRating"></app-star-rating>`,
  },
  {
    q: "What is Angular Module Federation and lazy loading advanced patterns?",
    a: "Module Federation (Webpack 5) enables true micro-frontends by sharing code between separately deployed Angular applications at runtime. Combined with advanced lazy loading patterns, it enables scalable enterprise architectures where teams deploy independently.",
    code: `// ── Host app webpack.config.js ───────────────────
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        mfe1: "mfe1@http://localhost:4201/remoteEntry.js",
        mfe2: "mfe2@http://localhost:4202/remoteEntry.js",
      },
      shared: {
        "@angular/core":   { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true },
        "@angular/router": { singleton: true },
      },
    }),
  ],
};

// ── Remote app webpack.config.js ──────────────────
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name:    "mfe1",
      filename:"remoteEntry.js",
      exposes: {
        "./Module": "./src/app/products/products.module.ts",
        "./Component": "./src/app/products/products.component.ts",
      },
      shared: { /* same shared config */ },
    }),
  ],
};

// ── Shell app routing ─────────────────────────────
const routes: Routes = [
  {
    path:        "products",
    loadChildren: () => import("mfe1/Module").then(m => m.ProductsModule),
  },
  {
    path:        "checkout",
    loadComponent: () => import("mfe2/Component").then(m => m.CheckoutComponent),
  },
];

// ── Dynamic remote loading ────────────────────────
@Injectable({ providedIn: "root" })
export class MfeLoaderService {
  loadRemote(config: RemoteConfig): Promise<Type<any>> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src   = config.remoteEntry;
      script.onload = async () => {
        const container = (window as any)[config.remoteName];
        await container.init(__webpack_share_scopes__.default);
        const factory = await container.get(config.exposedModule);
        resolve(factory().default);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}

// ── Advanced lazy loading pattern ─────────────────
@Component({
  template: \`
    @defer (on viewport; prefetch on idle) {
      <router-outlet></router-outlet>
    }
  \`
})
export class LayoutComponent {}`,
  },
  {
    q: "What are Angular testing strategies and patterns?",
    a: "Angular testing uses Jasmine with Karma (unit), or Jest, for unit and integration tests. TestBed creates a mini Angular environment. ComponentFixture provides access to the component and its DOM. Spectator simplifies testing boilerplate. E2E uses Cypress or Playwright.",
    code: `import { TestBed, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule }   from "@angular/router/testing";
import { of, throwError }        from "rxjs";

// ── Component test ────────────────────────────────
describe("UserListComponent", () => {
  let component: UserListComponent;
  let fixture:   ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj("UserService", ["getAll", "delete"]);

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers:    [{ provide: UserService, useValue: spy }],
      imports:      [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture     = TestBed.createComponent(UserListComponent);
    component   = fixture.componentInstance;
  });

  it("should display users from service", fakeAsync(() => {
    const mockUsers = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
    userService.getAll.and.returnValue(of(mockUsers));

    fixture.detectChanges(); // triggers ngOnInit
    tick();
    fixture.detectChanges(); // update view

    const lis = fixture.debugElement.queryAll(By.css("li"));
    expect(lis.length).toBe(2);
    expect(lis[0].nativeElement.textContent).toContain("Alice");
  }));

  it("should handle error state", fakeAsync(() => {
    userService.getAll.and.returnValue(throwError(() => new Error("Server error")));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css(".error-message"));
    expect(error).toBeTruthy();
  }));
});

// ── Service test ──────────────────────────────────
describe("UserService", () => {
  let service:    UserService;
  let httpMock:   HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [HttpClientTestingModule],
      providers: [UserService],
    });
    service  = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpMock.verify());

  it("should fetch users", () => {
    service.getAll().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users[0].name).toBe("Alice");
    });

    const req = httpMock.expectOne("/api/users");
    expect(req.request.method).toBe("GET");
    req.flush([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
  });
});`,
  },
  {
    q: "What are Angular advanced dependency injection patterns?",
    a: "Angular DI supports multiple providers: useClass, useValue, useFactory, useExisting. Injection tokens provide type-safe non-class dependencies. Multi-providers allow multiple values for one token. hierarchical injectors scope services. inject() function works anywhere in injection context.",
    code: `import {
  InjectionToken, inject, Inject, Optional, Self, SkipSelf, Host,
  EnvironmentInjector, createEnvironmentInjector
} from "@angular/core";

// ── InjectionToken for non-class values ───────────
const API_URL    = new InjectionToken<string>("API_URL");
const APP_CONFIG = new InjectionToken<AppConfig>("APP_CONFIG");
const LOGGER     = new InjectionToken<Logger>("LOGGER");

// ── Provider types ────────────────────────────────
const providers = [
  // useValue - provide a constant
  { provide: API_URL,    useValue: "https://api.example.com" },

  // useClass - provide a different class
  { provide: UserService, useClass: MockUserService },       // for testing
  { provide: Logger,      useClass: ConsoleLogger },

  // useFactory - provide computed value
  {
    provide:    APP_CONFIG,
    useFactory: (apiUrl: string) => ({
      apiUrl,
      version: "1.0",
      debug:   !environment.production,
    }),
    deps: [API_URL],
  },

  // useExisting - alias one token to another
  { provide: AbstractUserService, useExisting: UserService },

  // multi: true - multiple providers for same token
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,    multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];

// ── Consuming tokens ──────────────────────────────
@Injectable()
export class ApiService {
  private apiUrl = inject(API_URL);         // inject() function
  private config = inject(APP_CONFIG);

  constructor(@Inject(API_URL) private url: string) {} // constructor injection
}

// ── Injection visibility decorators ───────────────
@Component({ providers: [UserService] }) // component-level provider
export class MyComponent {
  // @Self() - only look in current injector (not parent)
  constructor(@Self() private service: UserService) {}

  // @Optional() - null if not provided (won't throw)
  constructor(@Optional() private cache?: CacheService) {}

  // @SkipSelf() - skip current, look in parent injector
  constructor(@SkipSelf() private parentService: SharedService) {}

  // @Host() - look in current component and host
  constructor(@Host() @Optional() private hostService?: HostService) {}
}

// ── Hierarchical injectors ────────────────────────
// Module injector (root) → lazy module injector → component injector
// Services declared at higher levels are singletons at that level

// ── Environment injector (Angular 14+) ────────────
const envInjector = createEnvironmentInjector(
  [{ provide: UserService, useClass: MockUserService }],
  parentInjector
);
envInjector.get(UserService); // scoped instance`,
  },
  {
    q: "What is Angular's new control flow and deferrable views in detail?",
    a: "Angular 17 introduced built-in control flow (@if, @for, @switch) replacing structural directives. Deferrable views (@defer) enable lazy loading of template sections with fine-grained control over when and how to load based on triggers like viewport, interaction, idle, or timer.",
    code: `// ── @if - replaces *ngIf ──────────────────────────
@Component({
  template: \`
    @if (user) {
      <h1>Welcome, {{ user.name }}!</h1>
      @if (user.isAdmin) {
        <app-admin-panel />
      }
    } @else if (isLoading) {
      <app-skeleton />
    } @else {
      <a routerLink="/login">Please login</a>
    }

    <!-- ── @for - replaces *ngFor ──────────────── -->
    @for (item of items; track item.id; let i = $index, last = $last) {
      <li class="{{ last ? 'last' : '' }}">
        {{ i + 1 }}. {{ item.name }}
      </li>
    } @empty {
      <li>No items available</li>
    }

    <!-- Available variables: $index, $first, $last, $even, $odd, $count -->

    <!-- ── @switch - replaces ngSwitch ─────────── -->
    @switch (userRole) {
      @case ("admin") { <app-admin-dashboard /> }
      @case ("user")  { <app-user-dashboard />  }
      @case ("guest") { <app-guest-view />       }
      @default        { <app-error />            }
    }

    <!-- ── @defer - lazy load sections ──────────── -->

    <!-- Load when element enters viewport -->
    @defer (on viewport) {
      <app-heavy-chart [data]="chartData" />
    } @placeholder (minimum 100ms) {
      <div class="chart-placeholder" style="height:300px">Chart</div>
    } @loading (minimum 500ms; after 100ms) {
      <app-spinner />
    } @error {
      <p>Failed to load chart. <button (click)="retryChart()">Retry</button></p>
    }

    <!-- Load on user interaction with trigger element -->
    @defer (on interaction(commentBtn)) {
      <app-comments [postId]="post.id" />
    } @placeholder {
      <button #commentBtn>Show Comments</button>
    }

    <!-- Load after 5 seconds -->
    @defer (on timer(5000)) {
      <app-recommendations />
    }

    <!-- Load when browser is idle -->
    @defer (on idle; prefetch on immediate) {
      <app-analytics-widget />
    }

    <!-- Load based on condition -->
    @defer (when isLoggedIn()) {
      <app-personalized-feed />
    }

    <!-- Prefetch immediately, render on viewport -->
    @defer (on viewport; prefetch on immediate) {
      <app-below-fold-content />
    }
  \`
})
export class ModernTemplateComponent {
  user      = signal<User | null>(null);
  isLoading = signal(false);
  userRole  = signal<"admin"|"user"|"guest">("user");
  isLoggedIn= computed(() => !!this.user());
  items     = signal<Item[]>([]);
}`,
  },
  {
    q: "What are Angular best practices for large-scale enterprise applications?",
    a: "Enterprise Angular applications require careful architecture: feature-based module/folder structure, strict TypeScript, state management patterns, smart/dumb component separation, comprehensive testing, performance budgets, accessibility, internationalization, and consistent code style with linting rules.",
    code: `// ── Feature-based folder structure ───────────────
// src/app/
//   core/                    ← singleton services, guards, interceptors
//     auth/
//     http/
//     store/
//   shared/                  ← reusable UI components, pipes, directives
//     components/
//     pipes/
//     directives/
//   features/                ← lazy-loaded feature modules
//     users/
//       components/
//       services/
//       store/
//       pages/
//       users.routes.ts
//     products/
//     orders/
//   layout/                  ← shell, header, sidebar, footer

// ── Smart / Dumb component separation ─────────────
// Smart (container) - handles data, state, logic
@Component({
  selector: "app-users-page",
  template: \`
    <app-user-filters (filterChange)="onFilterChange($event)" />
    <app-user-list
      [users]="users$ | async"
      [loading]="loading$ | async"
      (userSelected)="onUserSelect($event)"
      (userDeleted)="onUserDelete($event)"
    />
  \`,
})
export class UsersPageComponent {
  users$   = this.store.select(selectFilteredUsers);
  loading$ = this.store.select(selectLoading);
  onFilterChange(f: UserFilter) { this.store.dispatch(setFilter({ filter: f })); }
  onUserSelect(id: number) { this.router.navigate(["/users", id]); }
  onUserDelete(id: number) { this.store.dispatch(deleteUser({ id })); }
}

// Dumb (presentational) - only inputs/outputs, no side effects
@Component({
  selector: "app-user-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <app-spinner *ngIf="loading" />
    <li *ngFor="let user of users; trackBy: trackId">
      {{ user.name }}
      <button (click)="userDeleted.emit(user.id)">Delete</button>
    </li>
  \`,
})
export class UserListComponent {
  @Input() users:   User[]   = [];
  @Input() loading: boolean  = false;
  @Output() userSelected = new EventEmitter<number>();
  @Output() userDeleted  = new EventEmitter<number>();
  trackId = (_: number, u: User) => u.id;
}

// ── Strict TypeScript config ──────────────────────
// tsconfig.json:
// "strict": true,
// "noUnusedLocals": true,
// "noUnusedParameters": true,
// "noImplicitReturns": true,
// "forceConsistentCasingInFileNames": true

// ── ESLint config ─────────────────────────────────
// .eslintrc.json with @angular-eslint/recommended
// Rules: no-any, explicit-function-return-type,
//        prefer-readonly, no-unused-vars

// ── Performance budget ────────────────────────────
// angular.json:
// "budgets": [
//   { "type": "initial", "maximumWarning": "500kb", "maximumError": "1mb" },
//   { "type": "anyComponentStyle", "maximumWarning": "4kb" }
// ]`,
  },
  {
    q: "How do you implement internationalization (i18n) in Angular?",
    a: "Angular supports i18n through the built-in @angular/localize package (compile-time translation extraction/replacement) and third-party libraries like ngx-translate (runtime translation). Built-in i18n uses marking attributes and the ng extract-i18n CLI command.",
    code: `// ── @angular/localize (built-in) ─────────────────

// 1. Mark text for translation in templates
@Component({
  template: \`
    <!-- Simple translation -->
    <h1 i18n="@@pageTitle">Welcome to our app</h1>

    <!-- With description and meaning -->
    <p i18n="User greeting|Shown on dashboard@@dashboard.greeting">
      Hello, {{ userName }}!
    </p>

    <!-- Pluralization -->
    <p i18n>
      {itemCount, plural,
        =0    {No items}
        =1    {One item}
        other {{{ itemCount }} items}
      }
    </p>

    <!-- Select (gender) -->
    <p i18n>
      {gender, select,
        male   {He is a developer}
        female {She is a developer}
        other  {They are a developer}
      }
    </p>
  \`
})
export class AppComponent { userName = "Alice"; itemCount = 5; gender = "female"; }

// 2. Extract messages: ng extract-i18n --output-path src/locale
// Creates messages.xlf (XLIFF format)

// 3. Translate in locale files: src/locale/messages.fr.xlf

// 4. Build for locale:
// ng build --localize
// ng serve --configuration=fr

// ── ngx-translate (runtime, more flexible) ────────
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  template: \`
    <h1>{{ "WELCOME" | translate }}</h1>
    <p>{{ "GREETING" | translate: { name: userName } }}</p>
    <button>{{ "ACTIONS.SAVE" | translate }}</button>
  \`,
})
export class AppComponent implements OnInit {
  private translate = inject(TranslateService);
  userName = "Alice";

  ngOnInit() {
    this.translate.setDefaultLang("en");
    this.translate.use(this.getUserLocale());
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  private getUserLocale() {
    return localStorage.getItem("language") ?? navigator.language.split("-")[0] ?? "en";
  }
}

// ── Translation files (assets/i18n/en.json) ───────
// {
//   "WELCOME":  "Welcome to our app",
//   "GREETING": "Hello, {{ name }}!",
//   "ACTIONS": { "SAVE": "Save", "CANCEL": "Cancel" }
// }`,
  },
  {
    q: "What are Angular standalone components and the new application architecture?",
    a: "Standalone components (Angular 14+) work without NgModule declarations. They import their own dependencies directly. Angular 17+ makes standalone the default. The new application builder with esbuild provides faster builds. This simplifies the architecture and reduces boilerplate.",
    code: `// ── Standalone component ─────────────────────────
import { Component, Input, OnInit, inject } from "@angular/core";
import { CommonModule, AsyncPipe, NgFor, NgIf } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector:   "app-user-dashboard",
  standalone: true,                    // no NgModule needed ✅
  imports: [
    NgFor, NgIf, AsyncPipe,            // common directives (tree-shakable)
    RouterLink, RouterLinkActive,       // routing
    ReactiveFormsModule,                // forms
    UserCardComponent,                  // other standalone components
    LoadingSpinnerComponent,
    ButtonComponent,
  ],
  template: \`
    <div *ngFor="let user of users$ | async">
      <app-user-card [user]="user" />
    </div>
    <app-loading-spinner *ngIf="loading" />
    <a routerLink="/settings" routerLinkActive="active">Settings</a>
  \`,
})
export class UserDashboardComponent implements OnInit {
  private http = inject(HttpClient);
  users$ = this.http.get<User[]>("/api/users");
  loading = false;

  ngOnInit() {}
}

// ── Standalone routes ─────────────────────────────
// app.routes.ts
export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./dashboard/dashboard.component").then(m => m.DashboardComponent),
  },
  {
    path: "users",
    loadChildren: () => import("./users/users.routes").then(m => m.USER_ROUTES),
  },
];

// users/users.routes.ts
export const USER_ROUTES: Routes = [
  { path: "",    component: UserListComponent },
  { path: ":id", component: UserDetailComponent },
];

// ── Standalone bootstrap ──────────────────────────
// main.ts
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),    // pass route params as @Input
      withViewTransitions(),          // browser view transitions
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideStore({ users: usersReducer }),
    provideEffects([UsersEffects]),
    importProvidersFrom(TranslateModule.forRoot()),
  ],
});`,
  },
];