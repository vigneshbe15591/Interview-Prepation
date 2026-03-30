export const meta = {
  id: "typescript",
  label: "TypeScript",
  icon: "🔷",
  color: "#3178c6",
  desc: "Typed superset of JavaScript that compiles to plain JS.",
};

export const qaData = [
  {
    q: "Types vs Interfaces",
    a: "Both define shapes of objects. Interfaces are extendable and better for OOP. Types are more flexible — support unions, intersections, mapped types.",
    code: `// Interface - extendable
  interface User {
    id: number;
    name: string;
  }
  interface Admin extends User {
    role: "admin";
  }
  
  // Type - flexible
  type ID = string | number;
  type Point = { x: number; y: number };
  type Named = Point & { name: string };
  
  // Type for unions (only with type, not interface)
  type Status = "pending" | "active" | "inactive";
  type Result<T> = { data: T } | { error: string };`,
  },
  {
    q: "Generics",
    a: "Generics let you write reusable, type-safe functions and classes that work with any type. Like templates in other languages.",
    code: `// Generic function
  function identity<T>(arg: T): T { return arg; }
  identity<string>("hello"); // typed
  identity(42);              // inferred
  
  // Generic interface
  interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
  }
  
  // Generic constraint
  function getLength<T extends { length: number }>(arg: T): number {
    return arg.length;
  }
  getLength("hello"); // 5
  getLength([1,2,3]); // 3
  
  // Multiple generics
  function pair<K, V>(key: K, val: V): [K, V] {
    return [key, val];
  }`,
  },
  {
    q: "Union & Intersection Types",
    a: "Union (|) means a value can be one of several types. Intersection (&) combines multiple types into one requiring all properties.",
    code: `// Union
  type StringOrNumber = string | number;
  function format(val: StringOrNumber) {
    if (typeof val === "string") return val.toUpperCase();
    return val.toFixed(2);
  }
  
  // Discriminated union
  type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "rect"; w: number; h: number };
  
  function area(s: Shape) {
    switch (s.kind) {
      case "circle": return Math.PI * s.radius ** 2;
      case "rect":   return s.w * s.h;
    }
  }
  
  // Intersection
  type A = { name: string };
  type B = { age: number };
  type AB = A & B; // must have both name and age`,
  },
  {
    q: "Type Guards & Narrowing",
    a: "TypeScript narrows types within conditional branches. Type guards are expressions that perform runtime checks to narrow the type.",
    code: `// typeof guard
  function process(val: string | number) {
    if (typeof val === "string") {
      return val.toUpperCase(); // TS knows it's string here
    }
    return val * 2; // TS knows it's number here
  }
  
  // instanceof guard
  class Dog { bark() {} }
  class Cat { meow() {} }
  function speak(pet: Dog | Cat) {
    if (pet instanceof Dog) pet.bark();
    else pet.meow();
  }
  
  // User-defined type guard
  interface Fish { swim(): void }
  interface Bird { fly(): void }
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }`,
  },
  {
    q: "Utility Types",
    a: "Built-in generic types that transform existing types. Partial, Required, Readonly, Pick, Omit, Record, ReturnType are the most common.",
    code: `interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
  }
  
  type PartialUser  = Partial<User>;       // all optional
  type RequiredUser = Required<User>;      // all required
  type ReadonlyUser = Readonly<User>;      // all readonly
  type NameEmail    = Pick<User, "name" | "email">;
  type NoId         = Omit<User, "id">;
  type UserMap      = Record<string, User>;
  
  // ReturnType, Parameters
  function greet(name: string, age: number): string {
    return \`Hello \${name}\`;
  }
  type GreetReturn = ReturnType<typeof greet>;    // string
  type GreetParams = Parameters<typeof greet>;    // [string, number]`,
  },
  {
    q: "Decorators",
    a: "Decorators are special declarations that can be attached to classes, methods, or properties to modify their behavior. Commonly used in Angular and NestJS.",
    code: `// Class decorator
  function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
  }
  
  @sealed
  class Person {
    name: string;
    constructor(name: string) { this.name = name; }
  }
  
  // Method decorator
  function log(target: any, key: string, desc: PropertyDescriptor) {
    const orig = desc.value;
    desc.value = function(...args: any[]) {
      console.log(\`Calling \${key} with\`, args);
      return orig.apply(this, args);
    };
  }
  
  class Calculator {
    @log
    add(a: number, b: number) { return a + b; }
  }`,
  },
  {
    q: "Enums",
    a: "Enums define a set of named constants. Numeric enums auto-increment; string enums require explicit values. Const enums are inlined at compile time.",
    code: `// Numeric enum
  enum Direction { Up, Down, Left, Right }
  Direction.Up;    // 0
  Direction.Down;  // 1
  
  // String enum (preferred)
  enum Status {
    Pending  = "PENDING",
    Active   = "ACTIVE",
    Inactive = "INACTIVE",
  }
  
  // Const enum (no runtime object, fully inlined)
  const enum Size { Small = 1, Medium = 2, Large = 3 }
  
  function resize(s: Size) {
    if (s === Size.Large) console.log("big!");
  }
  
  // Union type alternative (often preferred over enum)
  type Dir = "up" | "down" | "left" | "right";`,
  },
  {
    q: "Mapped & Conditional Types",
    a: "Mapped types transform every property of a type. Conditional types choose between types based on a condition, like ternary for types.",
    code: `// Mapped type
  type Optional<T> = { [K in keyof T]?: T[K] };
  type Nullable<T> = { [K in keyof T]: T[K] | null };
  
  // Conditional type
  type IsString<T> = T extends string ? "yes" : "no";
  type R1 = IsString<string>;  // "yes"
  type R2 = IsString<number>;  // "no"
  
  // infer keyword
  type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
  type Str = UnpackPromise<Promise<string>>; // string
  
  // Template literal types
  type EventName = "click" | "focus" | "blur";
  type Handler = \`on\${Capitalize<EventName>}\`;
  // "onClick" | "onFocus" | "onBlur"`,
  },
];
