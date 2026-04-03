export const meta = {
  id: "typescript",
  label: "TypeScript",
  icon: "🔷",
  color: "#3178c6",
  desc: "Typed superset of JavaScript that compiles to plain JS, enabling safer and more maintainable code.",
};

export const qaData = [
  // ─── BEGINNER ────────────────────────────────────────────
  {
    q: "What is TypeScript and why should you use it?",
    a: "TypeScript is a statically typed superset of JavaScript developed by Microsoft. It adds optional static typing, interfaces, enums, generics, and modern JavaScript features that compile down to plain JavaScript. It catches errors at compile time rather than runtime, improving code quality and developer experience.",
    code: `// ── JavaScript (no type safety) ──────────────────
function add(a, b) {
  return a + b;
}
add(1, "2");   // "12" - silent bug! ❌
add(1, null);  // 1 - another silent bug! ❌

// ── TypeScript (type safe) ────────────────────────
function add(a: number, b: number): number {
  return a + b;
}
add(1, "2");   // ❌ Compile error: Argument of type 'string'
               //    is not assignable to parameter of type 'number'
add(1, null);  // ❌ Compile error: caught before runtime

// ── Key TypeScript benefits ───────────────────────
// 1. Catch errors at compile time (not in production)
// 2. Better IDE support (autocomplete, refactoring)
// 3. Self-documenting code via types
// 4. Safer refactoring
// 5. Works with existing JavaScript (gradual adoption)

// tsconfig.json - TypeScript configuration
// {
//   "compilerOptions": {
//     "target": "ES2022",        // output JS version
//     "module": "ESNext",        // module system
//     "strict": true,            // enable all strict checks
//     "outDir": "./dist",        // output directory
//     "rootDir": "./src",        // source directory
//     "declaration": true,       // generate .d.ts files
//     "sourceMap": true,         // source maps for debugging
//     "noImplicitAny": true,     // require explicit any
//     "strictNullChecks": true,  // null/undefined checks
//   }
// }`,
  },
  {
    q: "What are the basic types in TypeScript?",
    a: "TypeScript provides primitive types (number, string, boolean, null, undefined, symbol, bigint), object types (object, array, tuple), and special types (any, unknown, never, void). Type annotations are added with a colon after variable or parameter names.",
    code: `// ── Primitive types ──────────────────────────────
let age:     number   = 25;
let name:    string   = "Alice";
let isAdmin: boolean  = true;
let nothing: null     = null;
let missing: undefined = undefined;
let id:      symbol   = Symbol("id");
let big:     bigint   = 9007199254740991n;

// ── Arrays ────────────────────────────────────────
let scores:  number[]        = [95, 87, 92];
let names:   string[]        = ["Alice", "Bob"];
let mixed:   (string|number)[] = ["a", 1, "b", 2];
let matrix:  number[][]      = [[1,2],[3,4]];
// Generic syntax (equivalent)
let scores2: Array<number>   = [95, 87, 92];

// ── Tuple - fixed length and types ───────────────
let point:    [number, number]          = [10, 20];
let entry:    [string, number]          = ["Alice", 25];
let rgb:      [number, number, number]  = [255, 128, 0];
let optional: [string, number?]        = ["Alice"];     // optional second

// Labeled tuple elements
let namedPoint: [x: number, y: number] = [10, 20];

// ── Special types ─────────────────────────────────
let anyVal:  any     = "hello"; // disables type checking ⚠️
anyVal = 42;        // allowed
anyVal = true;      // allowed - any accepts everything

let unknownVal: unknown = "hello"; // safer than any
// unknownVal.toUpperCase(); // ❌ Error - must narrow first
if (typeof unknownVal === "string") {
  unknownVal.toUpperCase(); // ✅ narrowed to string
}

function neverReturns(): never {
  throw new Error("Always throws");
}

function logMessage(msg: string): void {
  console.log(msg); // returns undefined (no return value)
}

// ── Type inference ────────────────────────────────
let inferred = 42;       // TypeScript infers: number
let str      = "hello";  // TypeScript infers: string
let arr      = [1,2,3];  // TypeScript infers: number[]`,
  },
  {
    q: "What are interfaces in TypeScript?",
    a: "Interfaces define the shape (structure) of an object. They describe what properties and methods an object must have. Interfaces are purely a TypeScript compile-time construct — they produce no JavaScript output. They support optional properties, readonly properties, and extension.",
    code: `// ── Basic interface ───────────────────────────────
interface User {
  id:        number;
  name:      string;
  email:     string;
  age?:      number;      // optional (can be undefined)
  readonly createdAt: Date; // cannot be reassigned
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date(),
};
// user.createdAt = new Date(); // ❌ Error: readonly

// ── Interface with methods ────────────────────────
interface Repository<T> {
  findById(id: number): T | null;
  findAll(): T[];
  save(entity: T): T;
  delete(id: number): void;
}

// ── Optional and index signatures ────────────────
interface Config {
  host:    string;
  port?:   number;          // optional
  [key: string]: unknown;   // any additional string keys
}

const config: Config = {
  host: "localhost",
  port: 3000,
  debug: true,      // ✅ allowed via index signature
  timeout: 5000,    // ✅ allowed
};

// ── Interface extension ───────────────────────────
interface Animal {
  name: string;
  breathe(): void;
}
interface Pet extends Animal {
  owner: string;
  tricks: string[];
}
interface Dog extends Pet {
  breed: string;
  bark(): string;
}

// ── Multiple extension ────────────────────────────
interface Serializable { serialize(): string; }
interface Loggable     { log(): void; }

interface Entity extends Serializable, Loggable {
  id: number;
}

// ── Declaration merging ───────────────────────────
interface Window { myCustomProperty: string; }
interface Window { anotherProperty:  number; }
// Both merged: Window now has both properties`,
  },
  {
    q: "What is the difference between interface and type alias?",
    a: "Both define shapes but have key differences. Interfaces are extendable via declaration merging and better for OOP patterns. Type aliases are more flexible — they support unions, intersections, mapped types, conditional types, and primitives. In practice, prefer interfaces for objects and classes, types for everything else.",
    code: `// ── Interface ─────────────────────────────────────
interface UserInterface {
  id:   number;
  name: string;
}
// Can be extended (declaration merging)
interface UserInterface {
  email: string; // merged with above!
}
// Now UserInterface = { id, name, email }

// ── Type alias ────────────────────────────────────
type UserType = {
  id:   number;
  name: string;
};
// ❌ Cannot redeclare - causes error
// type UserType = { email: string; };

// ── Type can do things interface cannot ───────────
// Union type
type ID = string | number;
type Status = "pending" | "active" | "inactive";

// Intersection type (combine types)
type Admin = UserType & { role: "admin"; permissions: string[] };

// Tuple
type Point = [number, number];
type RGB   = [r: number, g: number, b: number];

// Conditional type
type IsString<T> = T extends string ? "yes" : "no";

// Mapped type
type Readonly2<T> = { readonly [K in keyof T]: T[K] };

// Primitive alias
type UserID = number;
type Email  = string;

// ── Interface can do things type can't ─────────────
// implements in class
interface Printable { print(): void; }
class Doc implements Printable {
  print() { console.log("Printing..."); }
}
// type Printable2 = { print(): void };
// class Doc2 implements Printable2 {} // also works actually

// ── Both are equivalent for objects ──────────────
interface A { x: number; }
type B = { x: number; };
// Nearly identical for basic object shapes

// ── When to use which ────────────────────────────
// Interface: public API, class contracts, extendable objects
// Type:      unions, intersections, primitives, mapped/conditional types`,
  },
  {
    q: "What are enums in TypeScript?",
    a: "Enums define a set of named constants. Numeric enums auto-increment from 0. String enums require explicit values. Const enums are inlined at compile time (no runtime object). Union type literals are often preferred over enums in modern TypeScript.",
    code: `// ── Numeric enum (auto-increments) ───────────────
enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right,  // 3
}
console.log(Direction.Up);      // 0
console.log(Direction[0]);      // "Up" (reverse mapping)

// Custom start value
enum HttpStatus {
  OK          = 200,
  Created     = 201,
  BadRequest  = 400,
  Unauthorized = 401,
  NotFound    = 404,
  ServerError = 500,
}

// ── String enum (explicit values, preferred) ─────
enum Role {
  Admin  = "ADMIN",
  User   = "USER",
  Guest  = "GUEST",
}
// No reverse mapping for string enums
const role: Role = Role.Admin; // "ADMIN"

// ── Const enum (inlined at compile time) ──────────
const enum Size {
  Small  = 1,
  Medium = 2,
  Large  = 3,
}
// Compiles to just the value (no runtime enum object)
const s: Size = Size.Medium; // compiles to: const s = 2;

// ── Heterogeneous enum (mixed - avoid) ────────────
enum Mixed {
  No  = 0,
  Yes = "YES",   // avoid mixing types
}

// ── Using enums ───────────────────────────────────
function getPermissions(role: Role): string[] {
  switch (role) {
    case Role.Admin: return ["read", "write", "delete"];
    case Role.User:  return ["read", "write"];
    case Role.Guest: return ["read"];
  }
}

// ── Modern alternative: const assertion union ────
const ROLES = ["admin", "user", "guest"] as const;
type RoleType = typeof ROLES[number]; // "admin" | "user" | "guest"

// Or literal union (simplest)
type Direction2 = "up" | "down" | "left" | "right";`,
  },
  {
    q: "What are union and intersection types?",
    a: "Union types (|) mean a value can be one of several types. Intersection types (&) combine multiple types, requiring all properties. Discriminated unions add a common literal property to distinguish union members and enable exhaustive switch checking.",
    code: `// ── Union types ───────────────────────────────────
type StringOrNumber = string | number;
type ID = string | number | null;

function format(val: StringOrNumber): string {
  if (typeof val === "string") return val.toUpperCase(); // narrowed
  return val.toFixed(2);                                  // narrowed
}

// ── Union in function parameters ──────────────────
function printId(id: number | string) {
  console.log(\`ID: \${id}\`);
}

// ── Discriminated union (tagged union) ────────────
type Circle    = { kind: "circle"; radius: number };
type Rectangle = { kind: "rect";   width: number; height: number };
type Triangle  = { kind: "tri";    base: number;  height: number };
type Shape     = Circle | Rectangle | Triangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "rect":   return shape.width * shape.height;
    case "tri":    return 0.5 * shape.base * shape.height;
    default:
      const _exhaustive: never = shape; // ✅ exhaustiveness check
      return _exhaustive;
  }
}

// ── Intersection types ────────────────────────────
type HasId   = { id: number };
type HasName = { name: string };
type HasTimestamps = { createdAt: Date; updatedAt: Date };

type Entity = HasId & HasName & HasTimestamps;
// Must have ALL properties: id, name, createdAt, updatedAt

type AdminUser = { role: "admin" } & { permissions: string[] } & Entity;

// ── Practical intersection ────────────────────────
type WithLoading<T> = T & { loading: boolean; error: string | null };
type UserWithState = WithLoading<{ users: User[] }>;
// { users: User[]; loading: boolean; error: string | null }

// ── Nullability with union ────────────────────────
type MaybeString = string | null | undefined;
type Optional<T> = T | null | undefined;

function greet(name: Optional<string>) {
  if (!name) return "Hello, stranger!";
  return \`Hello, \${name}!\`;
}`,
  },
  {
    q: "What is type narrowing in TypeScript?",
    a: "Type narrowing is the process of refining a type to a more specific type within a conditional block. TypeScript uses control flow analysis to narrow types based on typeof, instanceof, in operator, equality checks, truthiness, and user-defined type guards.",
    code: `// ── typeof narrowing ─────────────────────────────
function process(val: string | number | boolean) {
  if (typeof val === "string") {
    return val.toUpperCase(); // string here
  } else if (typeof val === "number") {
    return val.toFixed(2);   // number here
  } else {
    return val ? "yes" : "no"; // boolean here
  }
}

// ── instanceof narrowing ──────────────────────────
class Dog  { bark()  { return "Woof!"; } }
class Cat  { meow()  { return "Meow!"; } }

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    return animal.bark(); // Dog here
  }
  return animal.meow();   // Cat here
}

// ── in operator narrowing ─────────────────────────
interface Fish { swim(): void }
interface Bird { fly():  void }

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // Fish here
  } else {
    animal.fly();  // Bird here
  }
}

// ── Equality narrowing ────────────────────────────
function check(x: string | number, y: string | boolean) {
  if (x === y) {
    // x and y are both string here (only overlap)
    x.toUpperCase();
    y.toUpperCase();
  }
}

// ── Truthiness narrowing ──────────────────────────
function printName(name: string | null | undefined) {
  if (name) {
    console.log(name.toUpperCase()); // string here (not null/undefined/empty)
  }
}

// ── User-defined type guard ───────────────────────
function isString(val: unknown): val is string {
  return typeof val === "string";
}
function isUser(obj: unknown): obj is User {
  return typeof obj === "object" && obj !== null && "id" in obj && "name" in obj;
}

// ── Assertion functions ───────────────────────────
function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== "string") throw new Error("Not a string!");
}
// After assertIsString(x), TypeScript knows x is string`,
  },
  {
    q: "What are TypeScript generics and how do they work?",
    a: "Generics create reusable components that work with any type while maintaining type safety. They act as type parameters — placeholders for types that are specified when the generic is used. They prevent code duplication and the need for 'any'.",
    code: `// ── Basic generic function ───────────────────────
function identity<T>(arg: T): T { return arg; }

identity<string>("hello"); // explicit: returns string
identity(42);              // inferred: returns number

// ── Generic with constraint ───────────────────────
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
getLength("hello");   // 5
getLength([1, 2, 3]); // 3
getLength(42);        // ❌ Error: number has no length

// ── Multiple type parameters ──────────────────────
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
pair("name", "Alice"); // [string, string]
pair(1, true);         // [number, boolean]

// ── Generic interface ─────────────────────────────
interface ApiResponse<T> {
  data:    T;
  status:  number;
  message: string;
  meta?: { page: number; total: number };
}
type UserResponse = ApiResponse<User>;
type PostsResponse = ApiResponse<Post[]>;

// ── Generic class ─────────────────────────────────
class Stack<T> {
  private items: T[] = [];

  push(item: T): void   { this.items.push(item); }
  pop():         T | undefined { return this.items.pop(); }
  peek():        T | undefined { return this.items[this.items.length - 1]; }
  get size():    number { return this.items.length; }
  isEmpty():     boolean { return this.items.length === 0; }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.pop(); // 2

// ── Generic with default type ─────────────────────
interface Box<T = string> { value: T; }
const strBox: Box        = { value: "hello" }; // T defaults to string
const numBox: Box<number>= { value: 42 };

// ── Conditional generic return type ──────────────
type Unwrap<T> = T extends Promise<infer U> ? U : T;
type A = Unwrap<Promise<string>>; // string
type B = Unwrap<number>;          // number`,
  },
  {
    q: "What are TypeScript utility types?",
    a: "TypeScript provides built-in generic types that transform existing types. The most commonly used are Partial, Required, Readonly, Pick, Omit, Record, ReturnType, Parameters, Exclude, Extract, and NonNullable.",
    code: `interface User {
  id:       number;
  name:     string;
  email:    string;
  password: string;
  age?:     number;
  role:     "admin" | "user";
}

// ── Partial<T> - all properties optional ─────────
type UpdateUser = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

// ── Required<T> - all properties required ─────────
type StrictUser = Required<User>;
// { id: number; name: string; ... age: number; }

// ── Readonly<T> - all properties readonly ─────────
type FrozenUser = Readonly<User>;
const u: FrozenUser = { id: 1, name: "Alice", email: "", password: "", role: "user" };
// u.name = "Bob"; // ❌ Error: readonly

// ── Pick<T, K> - keep only specified keys ─────────
type PublicUser = Pick<User, "id" | "name" | "role">;
// { id: number; name: string; role: "admin" | "user" }

// ── Omit<T, K> - remove specified keys ────────────
type SafeUser   = Omit<User, "password">;       // no password
type NewUser    = Omit<User, "id" | "password">; // no id or password

// ── Record<K, V> - map keys to values ────────────
type RoleMap       = Record<string, string[]>;
type CountryCode   = "US" | "UK" | "DE";
type CountryConfig = Record<CountryCode, { name: string; currency: string }>;

// ── Exclude<T, U> - remove from union ────────────
type T1 = Exclude<"a" | "b" | "c", "b">;       // "a" | "c"
type T2 = Exclude<string | number | boolean, string>; // number | boolean

// ── Extract<T, U> - keep matching union members ──
type T3 = Extract<"a" | "b" | "c", "a" | "c">; // "a" | "c"
type T4 = Extract<string | number, number>;      // number

// ── NonNullable<T> - remove null/undefined ────────
type T5 = NonNullable<string | null | undefined>; // string

// ── ReturnType<T> - get function return type ──────
function getUser() { return { id: 1, name: "Alice" }; }
type UserReturn = ReturnType<typeof getUser>; // { id: number; name: string }

// ── Parameters<T> - get function params as tuple ─
function create(name: string, age: number, role: string) {}
type CreateParams = Parameters<typeof create>; // [string, number, string]

// ── InstanceType<T> ───────────────────────────────
class MyService {}
type ServiceInstance = InstanceType<typeof MyService>; // MyService`,
  },
  {
    q: "How does TypeScript handle classes?",
    a: "TypeScript enhances JavaScript classes with access modifiers (public, private, protected), readonly, abstract classes and methods, parameter properties (shorthand for declaring and assigning in constructor), and implements for interface compliance.",
    code: `// ── Access modifiers ─────────────────────────────
class BankAccount {
  public    owner:   string;       // accessible anywhere
  private   #balance: number;      // only within class (JS private field)
  protected accountType: string;   // class and subclasses
  readonly  id: string;            // can't be reassigned after init

  // Parameter properties - declare + assign in one step ✅
  constructor(
    public    name:    string,
    private   pin:     number,
    protected branch:  string,
    readonly  created: Date = new Date()
  ) {
    this.owner       = name;
    this.#balance    = 0;
    this.accountType = "checking";
    this.id          = crypto.randomUUID();
  }

  // Public method
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.#balance += amount;
  }

  // Private method
  private validate(amount: number): boolean {
    return amount > 0 && amount <= this.#balance;
  }

  // Getter
  get balance(): number { return this.#balance; }

  // Static
  static interestRate = 0.05;
  static calculate(principal: number) { return principal * BankAccount.interestRate; }
}

// ── Abstract class ────────────────────────────────
abstract class Shape {
  abstract area():      number;  // must be implemented
  abstract perimeter(): number;  // must be implemented

  describe(): string {           // shared implementation
    return \`Area: \${this.area().toFixed(2)}, Perimeter: \${this.perimeter().toFixed(2)}\`;
  }
}

class Circle extends Shape {
  constructor(public radius: number) { super(); }
  area()      { return Math.PI * this.radius ** 2; }
  perimeter() { return 2 * Math.PI * this.radius; }
}

// ── implements (not extends) ──────────────────────
interface Serializable { serialize():   string; }
interface Loggable     { log():         void; }

class Service implements Serializable, Loggable {
  serialize() { return JSON.stringify(this); }
  log()       { console.log(this.serialize()); }
}`,
  },

  // ─── INTERMEDIATE ─────────────────────────────────────────
  {
    q: "What are mapped types in TypeScript?",
    a: "Mapped types transform every property in a type by iterating over a union of keys. They use the syntax [K in keyof T] to create new types from existing ones. Combined with modifiers (readonly, ?) and template literal types, they enable powerful type transformations.",
    code: `// ── Basic mapped type ────────────────────────────
type Optional<T> = {
  [K in keyof T]?: T[K]; // same as Partial<T>
};

type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // remove readonly
};

type Required2<T> = {
  [K in keyof T]-?: T[K]; // remove optional (-)
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// ── Remapping keys with as ────────────────────────
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
// { getName: () => string; getAge: () => number; ... }

type Setters<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (val: T[K]) => void;
};

// ── Filter properties by type ─────────────────────
type StringOnly<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
interface Mixed { name: string; age: number; email: string; active: boolean; }
type StringProps = StringOnly<Mixed>; // { name: string; email: string }

// ── Deep partial ──────────────────────────────────
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// ── Proxy type pattern ────────────────────────────
type Proxy<T> = {
  [K in keyof T]: {
    get(): T[K];
    set(value: T[K]): void;
  };
};

// ── Template literal mapped types ─────────────────
type EventMap<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}Change\`]: (newVal: T[K], oldVal: T[K]) => void;
};
interface FormState { name: string; email: string; age: number; }
type FormEvents = EventMap<FormState>;
// { onNameChange, onEmailChange, onAgeChange }`,
  },
  {
    q: "What are conditional types in TypeScript?",
    a: "Conditional types choose between types based on a condition using the ternary-like syntax T extends U ? X : Y. They enable type-level programming — writing types that compute based on other types. The infer keyword extracts types within conditional checks.",
    code: `// ── Basic conditional type ───────────────────────
type IsString<T> = T extends string ? "yes" : "no";
type R1 = IsString<string>;  // "yes"
type R2 = IsString<number>;  // "no"

type IsArray<T>  = T extends any[] ? true : false;
type R3 = IsArray<string[]>; // true
type R4 = IsArray<string>;   // false

// ── infer keyword ─────────────────────────────────
// Extract the type from a Promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type A = UnwrapPromise<Promise<string>>;  // string
type B = UnwrapPromise<Promise<number[]>>;// number[]
type C = UnwrapPromise<string>;           // string (not a promise)

// Extract array element type
type ElementType<T> = T extends (infer U)[] ? U : never;
type D = ElementType<string[]>;  // string
type E = ElementType<number[]>;  // number

// Extract function return type
type RetType<T> = T extends (...args: any[]) => infer R ? R : never;
type F = RetType<() => string>;         // string
type G = RetType<(x: number) => boolean>; // boolean

// Extract first parameter
type FirstParam<T> = T extends (first: infer P, ...rest: any[]) => any ? P : never;
type H = FirstParam<(name: string, age: number) => void>; // string

// ── Distributive conditional types ────────────────
// When T is a union, conditional distributes over each member
type Flatten<T> = T extends any[] ? T[number] : T;
type I = Flatten<string[] | number | boolean[]>; // string | number | boolean

// Prevent distribution with []
type NoDistribute<T> = [T] extends [string] ? "yes" : "no";
type J = NoDistribute<string | number>; // "no" (not distributed)

// ── Practical examples ────────────────────────────
type NonFunction<T> = T extends Function ? never : T;
type DataOnly = NonFunction<string | number | (() => void)>; // string | number

type PromiseOrValue<T> = T extends Promise<infer U> ? U : T;
async function resolve<T>(val: T): Promise<PromiseOrValue<T>> {
  return val instanceof Promise ? await val : val as any;
}`,
  },
  {
    q: "What are template literal types in TypeScript?",
    a: "Template literal types create new string types by combining existing string types with template literal syntax. They enable precise typing of string patterns, event names, CSS properties, API routes, and more.",
    code: `// ── Basic template literal types ─────────────────
type Greeting = \`Hello, \${string}!\`;  // any string after Hello,
type EventName = \`on\${string}\`;        // any event handler name

// ── Union combination ─────────────────────────────
type Direction = "top" | "right" | "bottom" | "left";
type Alignment = "start" | "center" | "end";
type Position  = \`\${Direction}-\${Alignment}\`;
// "top-start" | "top-center" | "top-end" | "right-start" | ...

// ── CSS property types ────────────────────────────
type CSSUnit   = "px" | "em" | "rem" | "vw" | "vh" | "%";
type CSSLength = \`\${number}\${CSSUnit}\`;
// "10px" | "2em" | "100%" | etc.

// ── API route typing ──────────────────────────────
type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
type ApiVersion = "v1" | "v2";
type ApiRoute   = \`/api/\${ApiVersion}/\${string}\`;

// ── Event handler naming ──────────────────────────
type Capitalize2<S extends string> = S extends \`\${infer F}\${infer R}\`
  ? \`\${Uppercase<F>}\${R}\` : S;

type GetterName<T extends string>  = \`get\${Capitalize<T>}\`;
type SetterName<T extends string>  = \`set\${Capitalize<T>}\`;

type G1 = GetterName<"name">;  // "getName"
type G2 = SetterName<"email">; // "setEmail"

// ── Extract from template ─────────────────────────
// infer with template literals
type GetEventType<T> = T extends \`on\${infer Event}\` ? Lowercase<Event> : never;
type E1 = GetEventType<"onClick">;    // "click"
type E2 = GetEventType<"onKeyDown">;  // "keydown"

// ── Strongly typed event system ───────────────────
type EventHandlers<T extends Record<string, any>> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]?: (event: T[K]) => void;
};

interface AppEvents {
  click:    MouseEvent;
  keydown:  KeyboardEvent;
  resize:   UIEvent;
  message:  MessageEvent;
}
type AppHandlers = EventHandlers<AppEvents>;
// { onClick?: (e: MouseEvent) => void;
//   onKeydown?: (e: KeyboardEvent) => void; ... }`,
  },
  {
    q: "What are decorators in TypeScript?",
    a: "Decorators are special declarations applied to classes, methods, properties, or parameters. They receive metadata and can modify behavior at runtime. Widely used in Angular, NestJS, and TypeORM. Require experimentalDecorators in tsconfig.",
    code: `// tsconfig.json: "experimentalDecorators": true, "emitDecoratorMetadata": true

// ── Class decorator ───────────────────────────────
function Singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
  let instance: InstanceType<T>;
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      if (instance) return instance;
      instance = this as any;
    }
  };
}

@Singleton
class DatabaseConnection {
  connect() { console.log("Connected"); }
}
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1 === db2); // true ✅

// ── Method decorator ──────────────────────────────
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    const result = original.apply(this, args);
    console.log(\`\${key} returned\`, result);
    return result;
  };
  return descriptor;
}

function Memoize(target: any, key: string, descriptor: PropertyDescriptor) {
  const cache = new Map();
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    const cacheKey = JSON.stringify(args);
    if (cache.has(cacheKey)) return cache.get(cacheKey);
    const result = original.apply(this, args);
    cache.set(cacheKey, result);
    return result;
  };
  return descriptor;
}

class Calculator {
  @Log
  @Memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n-1) + this.fibonacci(n-2);
  }
}

// ── Property decorator ────────────────────────────
function Validate(min: number, max: number) {
  return function(target: any, key: string) {
    let val = target[key];
    Object.defineProperty(target, key, {
      get: () => val,
      set: (newVal: number) => {
        if (newVal < min || newVal > max)
          throw new RangeError(\`\${key} must be between \${min} and \${max}\`);
        val = newVal;
      },
    });
  };
}

class Person {
  @Validate(0, 150)
  age: number = 0;
}`,
  },
  {
    q: "What is the TypeScript module system and declaration files?",
    a: "TypeScript modules use ES module syntax. Declaration files (.d.ts) provide type information for JavaScript libraries without TypeScript source. The @types namespace provides community-maintained type definitions. Module augmentation extends existing module types.",
    code: `// ── ES Module exports ────────────────────────────
// math.ts
export const PI = 3.14159;
export function add(a: number, b: number): number { return a + b; }
export type MathResult = { value: number; operation: string };
export interface Calculator { compute(a: number, b: number): number; }
export default class AdvancedMath { /* ... */ }

// ── Named and default imports ──────────────────────
import AdvancedMath, { PI, add, type MathResult } from "./math";
import * as MathModule from "./math";
import { add as sum } from "./math"; // rename

// ── Declaration file (.d.ts) ──────────────────────
// types/my-library.d.ts - for a JS library without types
declare module "my-untyped-library" {
  export function doSomething(input: string): Promise<string>;
  export function configure(options: { timeout: number }): void;
  export const version: string;
  export interface Options { verbose?: boolean; retries?: number; }
  export default function main(config: Options): void;
}

// ── Ambient declarations ──────────────────────────
// globals.d.ts - declare global variables
declare const __DEV__: boolean;
declare const __VERSION__: string;
declare function require(module: string): any;

// Extend existing globals
declare global {
  interface Window {
    analytics: Analytics;
    featureFlags: Record<string, boolean>;
  }
  interface Array<T> {
    groupBy(key: keyof T): Record<string, T[]>;
  }
}

// ── Module augmentation ───────────────────────────
// Extend a third-party module's types
import "express";
declare module "express" {
  interface Request {
    user?:    { id: string; role: string };
    locale?:  string;
    traceId?: string;
  }
}

// ── Path mapping (tsconfig.json) ──────────────────
// {
//   "compilerOptions": {
//     "baseUrl": ".",
//     "paths": {
//       "@/*":          ["src/*"],
//       "@components/*":["src/components/*"],
//       "@utils/*":     ["src/utils/*"]
//     }
//   }
// }
import { Button } from "@components/Button"; // maps to src/components/Button`,
  },
  {
    q: "What is the infer keyword in TypeScript?",
    a: "The infer keyword is used within conditional types to capture and extract types. It introduces a type variable that TypeScript fills in during type inference. It's the key tool for 'unwrapping' or 'extracting' types from other types.",
    code: `// ── Basic infer ───────────────────────────────────
// Extract Promise inner type
type Awaited2<T> = T extends Promise<infer U> ? U : T;
type A = Awaited2<Promise<string>>;  // string
type B = Awaited2<Promise<number[]>>; // number[]

// Extract array element
type Item<T> = T extends Array<infer E> ? E : never;
type C = Item<string[]>;    // string
type D = Item<User[]>;      // User

// ── Extract function types ────────────────────────
type ReturnType2<T> = T extends (...args: any[]) => infer R ? R : never;
type FirstArg<T>    = T extends (first: infer A, ...rest: any[]) => any ? A : never;
type LastArg<T>     = T extends (...args: [...any[], infer L]) => any ? L : never;
type AllArgs<T>     = T extends (...args: infer A) => any ? A : never;

type Fn = (a: string, b: number, c: boolean) => void;
type R  = ReturnType2<Fn>;  // void
type F  = FirstArg<Fn>;     // string
type L  = LastArg<Fn>;      // boolean
type Al = AllArgs<Fn>;      // [string, number, boolean]

// ── Recursive infer ───────────────────────────────
// Deeply unwrap nested promises
type DeepAwaited<T> = T extends Promise<infer U> ? DeepAwaited<U> : T;
type E = DeepAwaited<Promise<Promise<Promise<string>>>>; // string

// ── Extract from template literal ─────────────────
type GetPath<T extends string> =
  T extends \`/api/\${infer Path}\` ? Path : never;
type F1 = GetPath<"/api/users">; // "users"
type F2 = GetPath<"/api/posts">; // "posts"

// ── Extract constructor params ────────────────────
type ConstructorParams<T> = T extends new (...args: infer P) => any ? P : never;
class MyClass { constructor(public name: string, public age: number) {} }
type Params = ConstructorParams<typeof MyClass>; // [string, number]

// ── Tuple manipulation ────────────────────────────
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer T] ? T : never;
type H = Head<[1, 2, 3]>; // 1
type T = Tail<[1, 2, 3]>; // [2, 3]`,
  },
  {
    q: "What are TypeScript declaration merging and module augmentation?",
    a: "Declaration merging combines multiple declarations with the same name. Interfaces merge automatically. Namespaces and functions can be merged with classes and enums. Module augmentation adds types to existing modules without modifying their source.",
    code: `// ── Interface merging ────────────────────────────
interface User { id: number; }
interface User { name: string; } // merged!
interface User { email: string; }
// Result: { id: number; name: string; email: string; }

const user: User = { id: 1, name: "Alice", email: "alice@ex.com" }; // ✅

// ── Namespace merging ─────────────────────────────
namespace Validation {
  export interface StringValidator { isValid(s: string): boolean; }
}
namespace Validation {
  export interface NumberValidator { isValid(n: number): boolean; }
  export const lettersRegexp = /^[A-Za-z]+$/;
}
// Both declarations merged into one namespace

// ── Function + namespace merging ──────────────────
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
  export let prefix = "Hello, ";
  export let suffix = "!";
}
buildLabel("Alice");     // "Hello, Alice!"
buildLabel.prefix = ""; // access namespace member

// ── Class + namespace merging ─────────────────────
class Album {
  label: Album.AlbumLabel = { name: "Unknown", release: new Date() };
}
namespace Album {
  export interface AlbumLabel { name: string; release: Date; }
  export function create(name: string) { return new Album(); }
}

// ── Module augmentation ───────────────────────────
// Add new exports to existing module
import { Observable } from "rxjs";
declare module "rxjs" {
  interface Observable<T> {
    toPromise(): Promise<T>; // add method types
  }
}

// Extend Express Request
declare module "express-serve-static-core" {
  interface Request {
    user:     { id: string; role: "admin" | "user" };
    token:    string;
    locale:   string;
    pagination: { page: number; limit: number; offset: number };
  }
}

// ── Global augmentation ───────────────────────────
declare global {
  interface String {
    toTitleCase(): string;
  }
  interface Array<T> {
    first(): T | undefined;
    last():  T | undefined;
    compact(): NonNullable<T>[];
  }
}
// Implement:
String.prototype.toTitleCase = function() {
  return this.replace(/\b\w/g, c => c.toUpperCase());
};`,
  },
  {
    q: "What are TypeScript strict mode options and what do they enable?",
    a: "TypeScript's strict flag enables a set of type-checking options that catch more bugs. It includes noImplicitAny, strictNullChecks, strictFunctionTypes, strictPropertyInitialization, strictBindCallApply, and noImplicitThis. Each targets a specific class of runtime errors.",
    code: `// tsconfig.json
// {
//   "compilerOptions": {
//     "strict": true,  // enables all below
//
//     "noImplicitAny":              true,
//     "strictNullChecks":           true,
//     "strictFunctionTypes":        true,
//     "strictBindCallApply":        true,
//     "strictPropertyInitialization": true,
//     "noImplicitThis":             true,
//     "alwaysStrict":               true,
//     "useUnknownInCatchVariables": true,
//   }
// }

// ── noImplicitAny ─────────────────────────────────
function greet(name) {         // ❌ Error: implicit any
  return \`Hello, \${name}\`;
}
function greet2(name: string) { // ✅
  return \`Hello, \${name}\`;
}

// ── strictNullChecks ──────────────────────────────
let name: string = "Alice";
name = null;    // ❌ Error: not assignable
name = undefined; // ❌ Error: not assignable
let nullable: string | null = null; // ✅ explicit

function getUser(): User | null { return null; }
const user = getUser();
user.name; // ❌ Error: user is possibly null
user?.name; // ✅ optional chaining

// ── strictPropertyInitialization ─────────────────
class Service {
  private db: Database; // ❌ Error: not initialized
  private repo: Repository; // ✅ with definite assignment assertion
  repo2!: Repository; // ✅ ! tells TS we guarantee initialization elsewhere

  constructor() {
    this.db   = new Database(); // ✅ initialized
    this.repo = new Repository(this.db); // ✅
  }
}

// ── strictFunctionTypes ───────────────────────────
type Handler = (event: MouseEvent) => void;
const handler: Handler = (e: Event) => {}; // ❌ stricter (contravariance)

// ── useUnknownInCatchVariables ────────────────────
try {
  doSomething();
} catch (error) {
  error.message; // ❌ Error: error is unknown (not any)
  if (error instanceof Error) {
    error.message; // ✅ narrowed
  }
}`,
  },
  {
    q: "What are TypeScript's advanced type patterns for React?",
    a: "TypeScript with React requires typing props, state, events, refs, hooks, and context correctly. Common patterns include PropsWithChildren, ComponentProps, EventHandler types, typed useState/useReducer, typed context, and generic components.",
    code: `import { useState, useRef, useContext, createContext,
         ReactNode, ComponentProps, HTMLAttributes,
         ChangeEvent, MouseEvent, FormEvent,
         FC, ReactElement, RefObject } from "react";

// ── Typing props ──────────────────────────────────
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "ghost";
  size?:    "sm" | "md" | "lg";
  loading?: boolean;
  icon?:    ReactElement;
  children: ReactNode; // string | number | ReactElement | ReactNode[]
}

const Button: FC<ButtonProps> = ({ variant = "primary", children, ...props }) => (
  <button className={\`btn btn--\${variant}\`} {...props}>{children}</button>
);

// ── Extending HTML element props ──────────────────
type InputProps = ComponentProps<"input"> & {
  label:   string;
  error?:  string;
  helper?: string;
};

// ── Event types ───────────────────────────────────
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {};
const handleClick  = (e: MouseEvent<HTMLButtonElement>) => {};
const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); };

// ── Typed useState ────────────────────────────────
const [user, setUser]   = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);
const [count, setCount] = useState(0); // inferred as number

// ── Typed useRef ──────────────────────────────────
const inputRef = useRef<HTMLInputElement>(null);
const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
inputRef.current?.focus(); // optional chain for null

// ── Typed Context ─────────────────────────────────
interface AuthContextType {
  user:    User | null;
  login:   (credentials: Credentials) => Promise<void>;
  logout:  () => void;
  isAdmin: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);

function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}

// ── Generic component ─────────────────────────────
interface ListProps<T> {
  items:      T[];
  renderItem: (item: T, index: number) => ReactElement;
  keyExtractor: (item: T) => string | number;
  emptyText?: string;
}
function List<T>({ items, renderItem, keyExtractor, emptyText = "No items" }: ListProps<T>) {
  if (!items.length) return <p>{emptyText}</p>;
  return <ul>{items.map((item, i) => <li key={keyExtractor(item)}>{renderItem(item, i)}</li>)}</ul>;
}`,
  },
  {
    q: "What is the satisfies operator in TypeScript?",
    a: "The satisfies operator (introduced in TypeScript 4.9) validates that a value matches a type while preserving the most specific type. Unlike a type annotation, it doesn't widen the type — you get both type safety and precise inference.",
    code: `// ── Problem satisfies solves ─────────────────────
type Colors = "red" | "green" | "blue";
type ColorMap = Record<Colors, string | [number, number, number]>;

// ── With type annotation (loses precision) ────────
const palette1: ColorMap = {
  red:   [255, 0, 0],
  green: "#00ff00",
  blue:  [0, 0, 255],
};
// palette1.red is string | [number, number, number]
palette1.red.toUpperCase(); // ❌ Error (might be array)
palette1.red[0];            // ❌ Error (might be string)

// ── With satisfies (keeps precise types) ──────────
const palette2 = {
  red:   [255, 0, 0],
  green: "#00ff00",
  blue:  [0, 0, 255],
} satisfies ColorMap;
// TypeScript knows:
// palette2.red   is [number, number, number] ✅
// palette2.green is string ✅
// palette2.blue  is [number, number, number] ✅

palette2.green.toUpperCase(); // ✅ string method
palette2.red[0];              // ✅ array index
palette2.blue.map(n => n * 2); // ✅ array method

// ── Validating config objects ─────────────────────
interface Config {
  port:    number;
  host:    string;
  options: Record<string, unknown>;
}

const config = {
  port:    3000,
  host:    "localhost",
  options: { debug: true, timeout: 5000 },
  extra:   "value", // ❌ Error: not in Config
} satisfies Config;

// ── Type checking without widening ────────────────
type Routes = Record<string, { path: string; component: string }>;

const routes = {
  home:    { path: "/",        component: "HomePage" },
  about:   { path: "/about",   component: "AboutPage" },
  contact: { path: "/contact", component: "ContactPage" },
} satisfies Routes;

// routes.home is still precisely { path: string; component: string }
// NOT widened to Routes[string]
type HomeRoute = typeof routes.home; // { path: string; component: string }

// ── Combined with const assertion ─────────────────
const settings = {
  theme:    "dark",
  language: "en",
  fontSize: 14,
} satisfies Record<string, string | number>;
// typeof settings.theme is "dark" (not string) ✅`,
  },

  // ─── INTERMEDIATE-ADVANCED ─────────────────────────────────
  {
    q: "What are TypeScript variance annotations and how do they affect type compatibility?",
    a: "Variance describes how generic types relate to their type arguments. Covariant types accept subtypes (out). Contravariant types accept supertypes (in). Invariant types must match exactly. TypeScript 4.7+ supports explicit variance annotations with in and out.",
    code: `// ── Covariance (out) - subtype accepted ──────────
// If Dog extends Animal, then Producer<Dog> extends Producer<Animal>
interface Producer<out T> {
  produce(): T; // T only appears in output position
}
const dogProducer: Producer<Dog> = { produce: () => new Dog() };
const animalProducer: Producer<Animal> = dogProducer; // ✅ covariant

// ── Contravariance (in) - supertype accepted ──────
// If Dog extends Animal, then Consumer<Animal> extends Consumer<Dog>
interface Consumer<in T> {
  consume(val: T): void; // T only appears in input position
}
const animalConsumer: Consumer<Animal> = { consume: (a) => {} };
const dogConsumer: Consumer<Dog> = animalConsumer; // ✅ contravariant

// ── Invariance - must match exactly ───────────────
// Without variance annotation (read AND write)
interface Container<T> {
  value: T;         // T in output position
  set(v: T): void;  // T in input position
}
// Container<Dog> is NOT assignable to Container<Animal> (invariant)

// ── Real-world example ────────────────────────────
// Arrays are technically mutable (invariant) but TypeScript
// treats them as covariant (for convenience, with some unsafety)
let dogs: Dog[] = [new Dog()];
let animals: Animal[] = dogs; // ✅ allowed (covariant in practice)
animals.push(new Cat()); // 💀 runtime error but TS doesn't catch this

// ReadonlyArray is properly covariant (no mutation)
let rdogs: ReadonlyArray<Dog> = [new Dog()];
let ranimals: ReadonlyArray<Animal> = rdogs; // ✅ safe

// ── Function parameter contravariance ─────────────
// Safer to use function type that accepts wider type
type AnimalHandler = (a: Animal) => void;
type DogHandler    = (d: Dog) => void;

// A handler that accepts any Animal can handle Dogs too
const handleAnimal: AnimalHandler = (a) => a.breathe();
const handleDog: DogHandler = handleAnimal; // ✅ safe (contravariant params)

// ── strictFunctionTypes enforces contravariance ───
// With strictFunctionTypes: true
type Handler<T> = (val: T) => void;
// Handler<Animal> is assignable to Handler<Dog> (not vice versa)`,
  },
  {
    q: "What are TypeScript's type-level programming patterns?",
    a: "TypeScript's type system is Turing-complete, enabling complex computations at the type level. Recursive types, conditional types, mapped types, and template literals combine to create powerful abstractions like deep readonly, path types, and schema validation.",
    code: `// ── Deep Readonly ────────────────────────────────
type DeepReadonly<T> =
  T extends (infer E)[] ? ReadonlyArray<DeepReadonly<E>> :
  T extends object       ? { readonly [K in keyof T]: DeepReadonly<T[K]> } :
  T;

type Config = { db: { host: string; port: number }; cache: string[] };
type ImmutableConfig = DeepReadonly<Config>;
// { readonly db: { readonly host: string; readonly port: number };
//   readonly cache: ReadonlyArray<string> }

// ── Object path types ─────────────────────────────
type Paths<T, D extends string = ""> =
  T extends object
    ? { [K in keyof T]: K extends string
        ? D extends ""
          ? K | Paths<T[K], K>
          : \`\${D}.\${K}\` | Paths<T[K], \`\${D}.\${K}\`>
        : never }[keyof T]
    : never;

interface Data { user: { profile: { name: string; age: number }; email: string }; }
type DataPaths = Paths<Data>;
// "user" | "user.profile" | "user.profile.name" | "user.profile.age" | "user.email"

// ── Get value type at path ─────────────────────────
type Get<T, K extends string> =
  K extends \`\${infer P}.\${infer Rest}\`
    ? P extends keyof T ? Get<T[P], Rest> : never
    : K extends keyof T ? T[K] : never;

type NameType = Get<Data, "user.profile.name">; // string
type AgeType  = Get<Data, "user.profile.age">;  // number

// ── Tuple operations ──────────────────────────────
type Reverse<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : [];
type Rev = Reverse<[1, 2, 3, 4]>; // [4, 3, 2, 1]

type Zip<A extends any[], B extends any[]> =
  A extends [infer AH, ...infer AT]
    ? B extends [infer BH, ...infer BT]
      ? [[AH, BH], ...Zip<AT, BT>]
      : []
    : [];
type Zipped = Zip<[1, 2, 3], ["a","b","c"]>; // [[1,"a"],[2,"b"],[3,"c"]]

// ── String manipulation at type level ─────────────
type Split<S extends string, D extends string> =
  S extends \`\${infer L}\${D}\${infer R}\` ? [L, ...Split<R, D>] : [S];
type Parts = Split<"a.b.c", ".">; // ["a", "b", "c"]`,
  },
  {
    q: "What are TypeScript abstract classes and how do they differ from interfaces?",
    a: "Abstract classes can have implementation (concrete methods and properties) alongside abstract (unimplemented) members. Unlike interfaces, they can have constructors, private/protected members, and produce JavaScript output. Use abstract classes for shared implementation, interfaces for contracts.",
    code: `// ── Abstract class ────────────────────────────────
abstract class Repository<T, ID = number> {
  // Concrete shared implementation
  private cache = new Map<ID, T>();

  protected abstract tableName: string; // abstract property

  // Abstract methods - must be implemented by subclass
  abstract findById(id: ID): Promise<T | null>;
  abstract findAll(options?: QueryOptions): Promise<T[]>;
  abstract save(entity: T): Promise<T>;
  abstract delete(id: ID): Promise<void>;

  // Concrete methods (shared behavior)
  async findOrFail(id: ID): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) throw new Error(\`\${this.tableName} \${id} not found\`);
    return entity;
  }

  async findCached(id: ID): Promise<T | null> {
    if (this.cache.has(id)) return this.cache.get(id)!;
    const entity = await this.findById(id);
    if (entity) this.cache.set(id, entity);
    return entity;
  }

  clearCache() { this.cache.clear(); }
}

// ── Concrete subclass ─────────────────────────────
class UserRepository extends Repository<User> {
  protected tableName = "users";

  async findById(id: number): Promise<User | null> {
    return db.query(\`SELECT * FROM \${this.tableName} WHERE id = ?\`, [id]);
  }
  async findAll(options?: QueryOptions): Promise<User[]> {
    return db.query(\`SELECT * FROM \${this.tableName}\`);
  }
  async save(user: User): Promise<User> {
    return db.query("INSERT INTO users ...", user);
  }
  async delete(id: number): Promise<void> {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
  }

  // Additional methods
  async findByEmail(email: string): Promise<User | null> {
    return db.query("SELECT * FROM users WHERE email = ?", [email]);
  }
}

// ── Cannot instantiate abstract class ────────────
// const repo = new Repository(); // ❌ Error

// ── Abstract vs Interface ─────────────────────────
interface IRepository<T> { findById(id: number): Promise<T | null>; }
// Interface: ✅ no runtime code, ✅ multiple implements
// Abstract:  ✅ shared code, ✅ constructor, ✅ access modifiers`,
  },
  {
    q: "What are TypeScript's new features in version 5.x?",
    a: "TypeScript 5.0+ introduced const type parameters, decorator standard support (ES2023), variadic tuple improvements, override keyword, @satisfies operator, and improved inference. TypeScript 5.4 added NoInfer utility type and other improvements.",
    code: `// ── TypeScript 5.0: const type parameters ────────
// Without const - types are widened
function createTuple<T extends readonly string[]>(arr: T) { return arr; }
const t1 = createTuple(["a", "b"]); // string[] (widened)

// With const - types are preserved as literals
function createTupleLiteral<const T extends readonly string[]>(arr: T) { return arr; }
const t2 = createTupleLiteral(["a", "b"]); // readonly ["a", "b"] ✅

// ── TypeScript 5.0: Standard decorators ──────────
// New TC39 standard decorators (no experimentalDecorators needed)
function log(target: any, context: ClassMethodDecoratorContext) {
  const method = target;
  return function(this: any, ...args: any[]) {
    console.log(\`Calling \${String(context.name)}\`);
    return method.call(this, ...args);
  };
}

class MyClass {
  @log
  greet(name: string) { return \`Hello, \${name}!\`; }
}

// ── TypeScript 4.9: satisfies ─────────────────────
const config = {
  port: 3000,
  host: "localhost",
} satisfies Record<string, string | number>;
config.host.toUpperCase(); // ✅ still string, not string | number

// ── TypeScript 5.2: using declarations ───────────
// Explicit Resource Management (Stage 3 proposal)
class DatabaseConnection implements Disposable {
  [Symbol.dispose]() { console.log("Connection closed"); }
  query(sql: string) { return []; }
}

async function example() {
  using conn = new DatabaseConnection(); // auto-dispose on scope exit
  const data = conn.query("SELECT * FROM users");
} // conn[Symbol.dispose]() called here automatically ✅

// ── TypeScript 5.4: NoInfer ───────────────────────
// Prevent widening of a type during inference
function createStrict<T>(items: T[], defaultItem: NoInfer<T>): T {
  return defaultItem ?? items[0];
}
// Without NoInfer: createStrict(["a","b"], "c") → T is string (widened to include "c")
// With NoInfer:    createStrict(["a","b"], "c") → ❌ Error: "c" not in "a"|"b"

// ── TypeScript 4.7: Module resolution ────────────
// nodenext / bundler resolution modes
// package.json "exports" field support
// .mts and .cts file extensions for ESM/CJS`,
  },

  // ─── ADVANCED ───────────────────────────────────────────────
  {
    q: "How do you design a type-safe event emitter in TypeScript?",
    a: "A type-safe event emitter uses mapped types and generic constraints to ensure event names and handler signatures match at compile time. This catches mismatched event names and wrong callback signatures before runtime.",
    code: `// ── Type-safe EventEmitter ───────────────────────
type EventMap = Record<string, any>;
type EventHandler<T> = (payload: T) => void;

class TypedEventEmitter<Events extends EventMap> {
  private listeners = new Map<keyof Events, Set<EventHandler<any>>>();

  on<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
    return () => this.off(event, handler); // returns unsubscribe fn
  }

  once<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    const wrapper: EventHandler<Events[K]> = (payload) => {
      handler(payload);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    this.listeners.get(event)?.delete(handler);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    this.listeners.get(event)?.forEach(handler => handler(payload));
  }
}

// ── Define event types ────────────────────────────
interface AppEvents {
  "user:login":   { userId: string; timestamp: Date };
  "user:logout":  { userId: string };
  "cart:add":     { productId: string; quantity: number };
  "cart:remove":  { productId: string };
  "order:placed": { orderId: string; total: number; items: string[] };
  "error":        { code: string; message: string; stack?: string };
}

// ── Usage with full type safety ───────────────────
const emitter = new TypedEventEmitter<AppEvents>();

// ✅ Types are enforced
emitter.on("user:login", ({ userId, timestamp }) => {
  console.log(\`User \${userId} logged in at \${timestamp}\`);
});

emitter.emit("cart:add", { productId: "p1", quantity: 2 }); // ✅
// emitter.emit("cart:add", { productId: "p1" }); // ❌ missing quantity
// emitter.emit("unknown", {}); // ❌ not in AppEvents

const unsub = emitter.on("error", ({ code, message }) => console.error(code, message));
unsub(); // unsubscribe`,
  },
  {
    q: "What are TypeScript assertion functions and control flow analysis?",
    a: "Assertion functions use the asserts keyword to tell TypeScript that if the function returns normally, a type assertion holds. Combined with control flow analysis, TypeScript tracks types through conditional branches, loops, and assignments.",
    code: `// ── Basic assertion functions ─────────────────────
function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== "string") throw new TypeError(\`Expected string, got \${typeof val}\`);
}

function assertDefined<T>(val: T | null | undefined, msg?: string): asserts val is T {
  if (val == null) throw new Error(msg ?? "Expected defined value");
}

// ── Usage ─────────────────────────────────────────
function processValue(val: unknown) {
  assertIsString(val);
  // TypeScript now knows val is string ✅
  console.log(val.toUpperCase());
}

function getUserName(user: User | null) {
  assertDefined(user, "User must not be null");
  // TypeScript now knows user is User (not null) ✅
  return user.name;
}

// ── Control flow analysis ─────────────────────────
function example(x: string | number | null) {
  if (x === null) {
    // x is null here
    return;
  }
  // x is string | number here (null excluded)

  if (typeof x === "string") {
    console.log(x.toUpperCase()); // x is string here
  } else {
    console.log(x.toFixed(2));    // x is number here
  }
}

// ── Narrowing through assignments ─────────────────
function refine(val: string | number | undefined) {
  if (val === undefined) return;
  // val: string | number

  val = "forced string"; // reassignment
  // val: string (TypeScript tracks this)
  val.toUpperCase(); // ✅
}

// ── Never type in exhaustive checks ──────────────
type Fruit = "apple" | "banana" | "cherry";

function getFruitColor(fruit: Fruit): string {
  switch (fruit) {
    case "apple":  return "red";
    case "banana": return "yellow";
    case "cherry": return "red";
    default:
      const exhaustiveCheck: never = fruit;
      throw new Error(\`Unhandled fruit: \${exhaustiveCheck}\`);
      // If you add "mango" to Fruit type, TS will error here ✅
  }
}`,
  },
  {
    q: "How do you implement a type-safe builder pattern in TypeScript?",
    a: "The builder pattern with TypeScript generics uses phantom types to track which properties have been set, providing compile-time guarantees that required fields are provided before building. Each setter method returns a new type that records the field as set.",
    code: `// ── Phantom type approach ────────────────────────
type BuilderState = { hasName: boolean; hasEmail: boolean; hasAge: boolean };

class UserBuilder<State extends BuilderState = {
  hasName: false; hasEmail: false; hasAge: false;
}> {
  private data: Partial<User> = {};

  setName(name: string): UserBuilder<State & { hasName: true }> {
    this.data.name = name;
    return this as any;
  }

  setEmail(email: string): UserBuilder<State & { hasEmail: true }> {
    this.data.email = email;
    return this as any;
  }

  setAge(age: number): UserBuilder<State & { hasAge: true }> {
    this.data.age = age;
    return this as any;
  }

  // Only available when ALL required fields are set
  build(this: UserBuilder<{ hasName: true; hasEmail: true; hasAge: boolean }>): User {
    return this.data as User;
  }
}

// ── Usage ─────────────────────────────────────────
const builder = new UserBuilder();

// ❌ build() not available yet - name and email not set
// builder.build(); // Error: Property 'build' does not exist

const user = builder
  .setName("Alice")   // now hasName: true
  .setEmail("a@x.com") // now hasEmail: true
  .setAge(25)          // optional
  .build();            // ✅ available now

// ── Simple fluent builder ─────────────────────────
class QueryBuilder<T extends object> {
  private conditions: string[] = [];
  private selectedFields: (keyof T)[] = [];
  private limitVal?: number;
  private offsetVal?: number;
  private orderByVal?: { field: keyof T; direction: "ASC" | "DESC" };

  select(...fields: (keyof T)[]): this { this.selectedFields = fields; return this; }
  where(condition: string): this { this.conditions.push(condition); return this; }
  limit(n: number): this { this.limitVal = n; return this; }
  offset(n: number): this { this.offsetVal = n; return this; }
  orderBy(field: keyof T, dir: "ASC" | "DESC" = "ASC"): this {
    this.orderByVal = { field, direction: dir };
    return this;
  }

  build(): string {
    const fields = this.selectedFields.length ? this.selectedFields.join(", ") : "*";
    let q = \`SELECT \${fields} FROM table\`;
    if (this.conditions.length) q += \` WHERE \${this.conditions.join(" AND ")}\`;
    if (this.orderByVal) q += \` ORDER BY \${String(this.orderByVal.field)} \${this.orderByVal.direction}\`;
    if (this.limitVal)  q += \` LIMIT \${this.limitVal}\`;
    if (this.offsetVal) q += \` OFFSET \${this.offsetVal}\`;
    return q;
  }
}`,
  },
  {
    q: "What are TypeScript's module patterns and dependency injection?",
    a: "TypeScript enables several DI patterns. Constructor injection with interfaces is the most common. reflect-metadata enables framework-level DI (NestJS, InversifyJS). Manual DI containers provide full type safety without decorators.",
    code: `// ── Interface-based DI ───────────────────────────
interface IUserRepository {
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<User>;
}
interface IEmailService {
  send(to: string, subject: string, body: string): Promise<void>;
}
interface ILogger {
  info(message: string): void;
  error(message: string, error?: Error): void;
}

class UserService {
  constructor(
    private readonly repo:         IUserRepository,
    private readonly emailService:  IEmailService,
    private readonly logger:        ILogger,
  ) {}

  async registerUser(data: CreateUserDto): Promise<User> {
    this.logger.info(\`Registering user: \${data.email}\`);
    const user = await this.repo.save(new User(data));
    await this.emailService.send(data.email, "Welcome!", "...");
    return user;
  }
}

// ── Simple DI Container ───────────────────────────
type Token<T> = symbol & { __type?: T };

function createToken<T>(name: string): Token<T> {
  return Symbol(name) as Token<T>;
}

class Container {
  private registry = new Map<symbol, any>();

  register<T>(token: Token<T>, value: T): void {
    this.registry.set(token, value);
  }

  resolve<T>(token: Token<T>): T {
    if (!this.registry.has(token)) {
      throw new Error(\`Token \${String(token)} not registered\`);
    }
    return this.registry.get(token);
  }
}

const TOKENS = {
  UserRepository: createToken<IUserRepository>("UserRepository"),
  EmailService:   createToken<IEmailService>("EmailService"),
  Logger:         createToken<ILogger>("Logger"),
  UserService:    createToken<UserService>("UserService"),
};

const container = new Container();
container.register(TOKENS.UserRepository, new PostgresUserRepository());
container.register(TOKENS.EmailService,   new SmtpEmailService());
container.register(TOKENS.Logger,         new ConsoleLogger());
container.register(TOKENS.UserService,    new UserService(
  container.resolve(TOKENS.UserRepository),
  container.resolve(TOKENS.EmailService),
  container.resolve(TOKENS.Logger),
));

const userService = container.resolve(TOKENS.UserService); // fully typed ✅`,
  },
  {
    q: "What are TypeScript's tuple types and variadic tuple types?",
    a: "Tuple types define arrays with a fixed number of elements at specific positions. Variadic tuples (TypeScript 4.0+) use spread elements to compose and manipulate tuple types. They enable typing of rest parameters, decorators, and pipeline functions.",
    code: `// ── Basic tuple types ────────────────────────────
type Point2D = [number, number];
type Point3D = [number, number, number];
type NameAge = [name: string, age: number]; // labeled elements

const p: Point2D = [10, 20];
const [x, y] = p; // destructuring

// Optional and rest in tuples
type AtLeastOne  = [string, ...number[]];
type OptionalEnd = [string, number?];

// ── Variadic tuples (TypeScript 4.0+) ─────────────
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];
type AB = Concat<[1, 2], [3, 4]>;         // [1, 2, 3, 4]
type AC = Concat<string[], number[]>;      // [...string[], ...number[]]

// ── Prepend and append ────────────────────────────
type Prepend<T, Arr extends unknown[]> = [T, ...Arr];
type Append<Arr extends unknown[], T>  = [...Arr, T];
type P = Prepend<string, [number, boolean]>; // [string, number, boolean]
type A = Append<[string, number], boolean>;  // [string, number, boolean]

// ── Length of tuple ───────────────────────────────
type Length<T extends readonly unknown[]> = T["length"];
type L1 = Length<[1, 2, 3]>;  // 3

// ── Function argument spreading ───────────────────
type Middleware<Params extends unknown[]> =
  (...args: [...Params, (err?: Error) => void]) => void;

type RouteMiddleware = Middleware<[Request, Response]>;
// (req: Request, res: Response, next: (err?: Error) => void) => void

// ── Pipeline typing ───────────────────────────────
function pipe<A>(value: A): A;
function pipe<A, B>(value: A, fn1: (a: A) => B): B;
function pipe<A, B, C>(value: A, fn1: (a: A) => B, fn2: (b: B) => C): C;
function pipe<A, B, C, D>(value: A, fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D): D;
function pipe(value: any, ...fns: Function[]): any {
  return fns.reduce((v, fn) => fn(v), value);
}

const result = pipe(
  "  hello world  ",
  (s: string) => s.trim(),
  (s: string) => s.split(" "),
  (arr: string[]) => arr.map(w => w.toUpperCase()),
  (arr: string[]) => arr.join("-"),
); // "HELLO-WORLD" - fully type-safe ✅`,
  },
  {
    q: "What is TypeScript's project references and monorepo support?",
    a: "Project references allow splitting a TypeScript codebase into smaller projects with explicit dependencies. They enable faster incremental builds, proper dependency isolation, and are essential for monorepos with multiple packages.",
    code: `// ── Project structure ────────────────────────────
// packages/
//   shared/
//     tsconfig.json
//     src/types.ts
//   api/
//     tsconfig.json
//     src/server.ts
//   web/
//     tsconfig.json
//     src/app.tsx
// tsconfig.json (root)

// ── Root tsconfig.json ────────────────────────────
// {
//   "files": [],   // empty - no files in root
//   "references": [
//     { "path": "./packages/shared" },
//     { "path": "./packages/api" },
//     { "path": "./packages/web" }
//   ]
// }

// ── packages/shared/tsconfig.json ─────────────────
// {
//   "compilerOptions": {
//     "composite":   true,       // REQUIRED for references
//     "declaration": true,       // REQUIRED for references
//     "outDir":      "./dist",
//     "rootDir":     "./src",
//     "strict":      true
//   },
//   "include": ["src/**/*"]
// }

// ── packages/api/tsconfig.json ────────────────────
// {
//   "compilerOptions": {
//     "composite":   true,
//     "declaration": true,
//     "outDir":      "./dist",
//     "strict":      true
//   },
//   "references": [
//     { "path": "../shared" }   // depends on shared
//   ]
// }

// ── packages/web/tsconfig.json ────────────────────
// {
//   "compilerOptions": { ... },
//   "references": [
//     { "path": "../shared" },  // depends on shared
//     { "path": "../api" }      // depends on api
//   ]
// }

// Build commands:
// tsc --build                    // build all
// tsc --build --watch            // watch mode
// tsc --build --clean            // clean outputs
// tsc --build packages/web       // build specific package + deps

// ── Path mapping for monorepo ─────────────────────
// Each package tsconfig.json:
// {
//   "compilerOptions": {
//     "paths": {
//       "@myapp/shared": ["../shared/src"],
//       "@myapp/api":    ["../api/src"]
//     }
//   }
// }

// ── Using shared types ────────────────────────────
// packages/shared/src/types.ts
export interface User { id: number; name: string; email: string; }
export type ApiResponse<T> = { data: T; status: number };

// packages/api/src/server.ts
import { User, ApiResponse } from "@myapp/shared"; // ✅ type-safe cross-package`,
  },
  {
    q: "How do you type-check JSON data with TypeScript using Zod?",
    a: "Zod is a TypeScript-first schema validation library that provides runtime type checking and TypeScript type inference from the same schema definition. It bridges the gap between runtime validation and compile-time types.",
    code: `import { z } from "zod";

// ── Define schema ─────────────────────────────────
const UserSchema = z.object({
  id:    z.number().positive(),
  name:  z.string().min(1).max(100),
  email: z.string().email(),
  age:   z.number().int().min(0).max(150).optional(),
  role:  z.enum(["admin", "user", "guest"]),
  createdAt: z.date().or(z.string().transform(s => new Date(s))),
  tags:  z.array(z.string()).default([]),
  meta:  z.record(z.string(), z.unknown()).optional(),
});

// ── Infer TypeScript type ─────────────────────────
type User = z.infer<typeof UserSchema>;
// {
//   id:        number;
//   name:      string;
//   email:     string;
//   age?:      number;
//   role:      "admin" | "user" | "guest";
//   createdAt: Date;
//   tags:      string[];
//   meta?:     Record<string, unknown>;
// }

// ── Validate data ─────────────────────────────────
const data: unknown = await fetch("/api/user/1").then(r => r.json());

// Parse (throws on error)
try {
  const user = UserSchema.parse(data); // User type guaranteed ✅
  console.log(user.name.toUpperCase()); // type safe
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error(e.errors); // detailed error messages
  }
}

// Safe parse (returns result object)
const result = UserSchema.safeParse(data);
if (result.success) {
  const user: User = result.data; // ✅
} else {
  console.error(result.error.flatten());
}

// ── Advanced schemas ──────────────────────────────
const LoginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[A-Z])(?=.*[0-9])/),
}).refine(data => !data.email.includes("+"), {
  message: "Plus signs not allowed in email",
  path:    ["email"],
});

// Discriminated union
const EventSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("click"), x: z.number(), y: z.number() }),
  z.object({ type: z.literal("key"),   key: z.string() }),
]);
type AppEvent = z.infer<typeof EventSchema>;

// ── Express middleware ─────────────────────────────
function validate<T>(schema: z.ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error.flatten());
    req.body = result.data; // validated and typed ✅
    next();
  };
}
app.post("/users", validate(LoginSchema), createUser);`,
  },
  {
    q: "What are TypeScript performance best practices for large codebases?",
    a: "TypeScript compile performance degrades with complex types and large codebases. Key optimizations include avoiding type instantiation depth, using type aliases over inline types, isolatedModules, incremental compilation, project references, and avoiding expensive utility types on large unions.",
    code: `// ── 1. Avoid deep recursive types ────────────────
// ❌ Expensive - may hit instantiation limit
type DeepNestedBad<T, Depth extends number = 10> =
  Depth extends 0 ? T : { value: T; nested: DeepNestedBad<T, SubtractOne<Depth>> };

// ✅ Limit recursion depth explicitly
type DeepPartial<T, Depth extends 0[]= []> =
  Depth["length"] extends 5 // max 5 levels deep
    ? T
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K], [0, ...Depth]> }
      : T;

// ── 2. Use type aliases for repeated complex types ─
// ❌ Repeated complex inline types slow compilation
function process(data: Record<string, { id: number; name: string; meta: unknown }>) {}
function transform(data: Record<string, { id: number; name: string; meta: unknown }>) {}

// ✅ Extract to alias
type DataRecord = Record<string, { id: number; name: string; meta: unknown }>;
function process2(data: DataRecord) {}
function transform2(data: DataRecord) {}

// ── 3. Avoid large union types ────────────────────
// ❌ Expensive: 100+ member union
type All100Routes = "/home" | "/about" | "/contact" | /* 97 more... */ "/settings";

// ✅ Use template literals for patterns
type Route = \`/\${string}\`;

// ── 4. tsconfig.json optimizations ───────────────
// {
//   "compilerOptions": {
//     "incremental": true,          // cache build info
//     "tsBuildInfoFile": ".tsbuildinfo",
//     "skipLibCheck": true,         // skip .d.ts type checking
//     "isolatedModules": true,      // each file standalone (Vite/esbuild compat)
//     "noEmitOnError": false,       // faster in watch mode
//   }
// }

// ── 5. Use interface over type for objects ────────
// Interfaces are cached by name; type aliases recomputed
interface User2 { id: number; name: string; } // ✅ cached
type User3 = { id: number; name: string; };    // less caching

// ── 6. Avoid conditional types in hot paths ───────
// Use overloads instead of complex conditional return types
function parse(val: string): string; // overload 1
function parse(val: number): number; // overload 2
function parse(val: string | number): string | number { return val; }

// ── 7. Measure with tsc --extendedDiagnostics ─────
// tsc --extendedDiagnostics 2>&1 | grep "Types"
// Reports: Files, Lines, Types, Instantiations, Memory`,
  },
  {
    q: "How do you create a type-safe API client in TypeScript?",
    a: "A type-safe API client maps route definitions to typed fetch functions. Using TypeScript's template literal types, mapped types, and generics, you can create a client where routes, request bodies, query params, and responses are all fully typed.",
    code: `// ── Define API schema ────────────────────────────
interface ApiSchema {
  "GET /users":             { response: User[];     params?: { page?: number; limit?: number } };
  "GET /users/:id":         { response: User;       params: { id: string } };
  "POST /users":            { response: User;       body: CreateUserDto };
  "PUT /users/:id":         { response: User;       body: Partial<User>; params: { id: string } };
  "DELETE /users/:id":      { response: void;       params: { id: string } };
  "GET /posts":             { response: Post[];     params?: { userId?: string } };
  "POST /posts/:id/like":   { response: { likes: number }; params: { id: string } };
}

// ── Extract route parts ───────────────────────────
type Method  = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Routes  = keyof ApiSchema;
type GetMethod<R extends Routes> = R extends \`\${infer M} \${string}\` ? M : never;
type GetPath<R extends Routes>   = R extends \`\${string} \${infer P}\` ? P : never;

// ── Request/Response types ────────────────────────
type GetBody<R extends Routes>     = ApiSchema[R] extends { body: infer B }     ? B     : never;
type GetResponse<R extends Routes> = ApiSchema[R] extends { response: infer Res } ? Res  : never;
type GetParams<R extends Routes>   = ApiSchema[R] extends { params: infer P }   ? P     : undefined;

// ── Type-safe API client ──────────────────────────
class ApiClient {
  constructor(private baseUrl: string, private token?: string) {}

  private async request<R extends Routes>(
    route: R,
    options: {
      params?:      GetParams<R>;
      body?:        GetBody<R>;
      queryParams?: Record<string, string | number | undefined>;
    } = {}
  ): Promise<GetResponse<R>> {
    const [method, pathTemplate] = route.split(" ") as [Method, string];

    // Replace path params
    let path = pathTemplate;
    if (options.params) {
      Object.entries(options.params).forEach(([k, v]) => {
        path = path.replace(\`:\${k}\`, String(v));
      });
    }

    // Build URL with query params
    const url = new URL(\`\${this.baseUrl}\${path}\`);
    if (options.queryParams) {
      Object.entries(options.queryParams).forEach(([k, v]) => {
        if (v !== undefined) url.searchParams.set(k, String(v));
      });
    }

    const res = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(this.token ? { "Authorization": \`Bearer \${this.token}\` } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) throw new Error(\`\${method} \${path} failed: \${res.status}\`);
    if (method === "DELETE") return undefined as any;
    return res.json();
  }

  // Convenience methods with full type safety
  getUsers(params?: { page?: number; limit?: number }) {
    return this.request("GET /users", { queryParams: params });
  }
  getUserById(id: string) {
    return this.request("GET /users/:id", { params: { id } });
  }
  createUser(body: CreateUserDto) {
    return this.request("POST /users", { body });
  }
}

// ── Usage ─────────────────────────────────────────
const api = new ApiClient("https://api.example.com", "token");

const users: User[]  = await api.getUsers({ page: 1, limit: 10 });
const user:  User    = await api.getUserById("123");
const newUser: User  = await api.createUser({ name: "Alice", email: "a@x.com" });`,
  },
  {
    q: "What are TypeScript's structural vs nominal typing and how to simulate nominal types?",
    a: "TypeScript uses structural typing — types are compatible if they have the same shape, regardless of name. This can allow unintended assignments. Nominal typing (name-based) can be simulated using brand types, opaque types, or unique symbol tags to distinguish types with the same structure.",
    code: `// ── Structural typing (default) ──────────────────
interface Point2D { x: number; y: number; }
interface Vector2D { x: number; y: number; }

function addPoints(a: Point2D, b: Point2D): Point2D {
  return { x: a.x + b.x, y: a.y + b.y };
}

const vec: Vector2D = { x: 1, y: 2 };
addPoints(vec, vec); // ✅ Works! Same structure = compatible
// This can be a bug - mixing Points and Vectors unintentionally

// ── Brand/Tag technique ───────────────────────────
// Add a unique phantom property to distinguish types
type Brand<T, B> = T & { readonly __brand: B };

type UserId    = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;
type OrderId   = Brand<string, "OrderId">;
type USD       = Brand<number, "USD">;
type EUR       = Brand<number, "EUR">;

// Constructor functions (the only way to create branded values)
function createUserId(id: string): UserId       { return id as UserId; }
function createProductId(id: string): ProductId { return id as ProductId; }
function toUSD(amount: number): USD             { return amount as USD; }
function toEUR(amount: number): EUR             { return amount as EUR; }

// Functions that require specific branded types
function getUser(id: UserId): User { /* ... */ return {} as User; }
function getProduct(id: ProductId): Product { /* ... */ return {} as Product; }
function addUSD(a: USD, b: USD): USD { return (a + b) as USD; }

const userId    = createUserId("user-123");
const productId = createProductId("prod-456");

getUser(userId);       // ✅
getUser(productId);    // ❌ Error: ProductId not assignable to UserId ✅

const price1 = toUSD(100);
const price2 = toEUR(85);
addUSD(price1, price1); // ✅
// addUSD(price1, price2); // ❌ Error: EUR not assignable to USD ✅

// ── Unique symbol nominal types ───────────────────
declare const EmailSymbol:    unique symbol;
declare const PhoneSymbol:    unique symbol;

type Email = string & { readonly [EmailSymbol]: void };
type Phone = string & { readonly [PhoneSymbol]: void };

function createEmail(s: string): Email {
  if (!s.includes("@")) throw new Error("Invalid email");
  return s as Email;
}

function sendEmail(to: Email, subject: string) { /* ... */ }

const email = createEmail("alice@example.com");
const phone = "+1234567890" as Phone;
sendEmail(email, "Hello"); // ✅
// sendEmail(phone, "Hello"); // ❌ Phone != Email ✅`,
  },
  {
    q: "What are TypeScript's type testing patterns and how to test types?",
    a: "Type testing verifies that TypeScript types behave as expected. Tools like tsd, expect-type, and vitest's type testing feature let you write assertions that specific types are equal, assignable, or raise errors, catching type regressions in CI.",
    code: `// ── Using expect-type library ────────────────────
import { expectType, expectNotType, expectAssignable, expectError } from "tsd";

// Test exact type equality
expectType<string>({ } as ReturnType<typeof getUserName>);

// Test assignability
expectAssignable<{ name: string }>({ name: "Alice", age: 25 }); // ✅ subtype assignable

// Test error (should not compile)
expectError(getUserById(123)); // if getUserById expects string, 123 should error

// ── Vitest type testing (v0.30+) ──────────────────
import { describe, it } from "vitest";
import { assertType, expectTypeOf } from "vitest";

describe("type tests", () => {
  it("ApiResponse wraps type correctly", () => {
    type Result = ApiResponse<User>;
    expectTypeOf<Result>().toMatchTypeOf<{ data: User; status: number }>();
    expectTypeOf<Result["data"]>().toEqualTypeOf<User>();
    expectTypeOf<Result["status"]>().toEqualTypeOf<number>();
  });

  it("DeepPartial makes all fields optional", () => {
    type DP = DeepPartial<{ name: string; address: { city: string } }>;
    expectTypeOf<DP["name"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<DP["address"]>().toEqualTypeOf<{ city?: string } | undefined>();
  });
});

// ── Compile-error testing with @ts-expect-error ───
// @ts-expect-error - next line should error
const bad: string = 42; // ✅ line errors as expected

// @ts-expect-error
getUserById(123); // expects string, 123 is number

// If the error goes away, @ts-expect-error itself becomes an error ✅

// ── Type utility for testing ───────────────────────
type Equals<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false;
type IsTrue<T extends true> = T;

type Test1 = IsTrue<Equals<string, string>>;    // ✅
type Test2 = IsTrue<Equals<string, number>>;    // ❌ Error: false is not true

// ── Testing conditional types ──────────────────────
type TestCases = [
  Equals<IsString<string>,  "yes">,  // true
  Equals<IsString<number>,  "no">,   // true
  Equals<Unwrap<Promise<string>>, string>, // true
  Equals<ElementType<number[]>,    number>, // true
];
type AllPass = IsTrue<TestCases[number]>; // all must be true`,
  },
  {
    q: "What is TypeScript's type narrowing with discriminated unions and exhaustiveness checking?",
    a: "Discriminated unions use a common literal property (the discriminant) to distinguish union members. TypeScript narrows the type in each branch. Exhaustiveness checking with never ensures all cases are handled — adding a new union member forces you to handle it.",
    code: `// ── Define discriminated union ───────────────────
type LoadingState<T> =
  | { status: "idle"    }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error";   error: Error; retries: number };

// ── Narrowing in switch ───────────────────────────
function renderState<T>(state: LoadingState<T>): string {
  switch (state.status) {
    case "idle":
      return "Click to load";
    case "loading":
      return "Loading...";
    case "success":
      return \`Data: \${JSON.stringify(state.data)}\`; // state.data available ✅
    case "error":
      return \`Error: \${state.error.message} (retry \${state.retries})\`; // state.error ✅
    default:
      // Exhaustiveness check - state is never here if all cases handled
      const _exhaustive: never = state;
      throw new Error(\`Unhandled status: \${JSON.stringify(_exhaustive)}\`);
  }
}

// Adding new union member → TypeScript error in switch ✅
// | { status: "cancelled" } → default case: never assignment fails

// ── Helper function for exhaustiveness ────────────
function assertNever(val: never, message?: string): never {
  throw new Error(message ?? \`Unexpected value: \${JSON.stringify(val)}\`);
}

// ── Complex discriminated union ───────────────────
type Action =
  | { type: "ADD_ITEM";    payload: { id: string; name: string; price: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QTY";  payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART"  }
  | { type: "APPLY_COUPON";payload: { code: string; discount: number } };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    case "UPDATE_QTY":
      return { ...state, items: state.items.map(i =>
        i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
      )};
    case "CLEAR_CART":
      return { ...state, items: [], coupon: null };
    case "APPLY_COUPON":
      return { ...state, discount: action.payload.discount };
    default:
      return assertNever(action); // ❌ Error if new action type added without handling
  }
}`,
  },
];