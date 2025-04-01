Inheritance
============

**Date:** *04/01/2025*

**Author:** *Anderson Lee*

# Inheritance in Object-Oriented Programming (OOP)

Inheritance is a fundamental concept in object-oriented programming (OOP) that allows a new class to inherit properties and behaviors (methods) from an existing class. The existing class is called the "parent" or "superclass," and the new class is called the "child" or "subclass." Inheritance promotes code reusability and establishes a natural hierarchy between classes.

## Table of Contents
1. What is Inheritance?
2. Benefits of Inheritance
3. Inheritance in Java
4. `instanceof` Operator
5. Upcasting and Downcasting
6. Access **inherited** fields
7. **Overriding** Methods
    * Overriding vs. Overloading
8. The `super` Keyword
9. The `Object` Class
10. **Polymorphism**

## What is Inheritance?
Inheritance is a mechanism that allows one class to inherit the fields and methods of another class. The class that inherits is called the subclass, and the class being inherited from is called the superclass. This allows the subclass to reuse code from the superclass and add its own unique features.

The subclass and superclass holds an **is-a** relationship. For example, a `Dog` (subclass) is a `Animal` (superclass).

## Benefits of Inheritance
- **Code Reusability**: Inheritance allows subclasses to reuse code from the superclass, reducing redundancy.
- **Method Overriding**: Subclasses can provide specific implementations for methods defined in the superclass.
- **Polymorphism**: Inheritance supports polymorphism, allowing objects to be treated as instances of their superclass.

## Inheritance in Java
In Java, inheritance is implemented using the `extends` keyword. A subclass extends a superclass to inherit its properties and methods.

### Example
~~~java
// Class implementation
class Animal {
    public String name;
    public int age;
    public String color;

    public Animal(String name, int age, String color) {
        this.name = name;
        this.age = age;
        this.color = color;
    }
}

class Dog extends Animal {
    public String breed;

    public Dog(String name, int age, String color, String breed) {
        super(name, age, color);
        this.breed = breed;
    }
}

// Usage
Dog myDog = new Dog("Buddy", 3, "Brown", "Labrador");
Animal myAnimal = new Animal("Buddy", 3, "Brown");
~~~

## Downcasting and Upcasting
* Downcasting is the process of converting a superclass reference to a subclass reference.
* Upcasting is the process of converting a subclass reference to a superclass reference.

Typically, upcasting is implicit and downcasting is explicit. Downcasting might be dangerous because the superclass might not have all functionalities of the subclass. If the subclass doesn't support the method called, it'll throw an exception at **runtime**. Example 2 shows the danger of downcasting.

### Example 1
~~~java
Dog myDog = new Dog("Buddy", 3, "Brown", "Labrador"); // no casting
Animal myAnimal = new Dog("Buddy", 3, "Brown", "Labrador"); // upcasting
Dog myDog2 = (Dog) myAnimal; // downcasting
~~~

### Example 2
In this example, the `Dog` object has a `bark` method that `Animal` doesn't have. If we downcast `myAnimal` to `Dog` and try to call `bark`, it'll throw a `ClassCastException` at runtime because `myAnimal` **is not** a `Dog`.
~~~java
// Class implementation
class Animal {
    public String name;
    public int age;
    public String color;

    public Animal(String name, int age, String color) {
        this.name = name;
        this.age = age;
        this.color = color;
    }
}

class Dog extends Animal {
    public String breed;

    public Dog(String name, int age, String color, String breed) {
        super(name, age, color);
        this.breed = breed;
    }

    public void bark() {
        System.out.println("Woof!");
    }
}

// Usage
Animal myAnimal = new Animal("Buddy", 3, "Brown");
Dog myDog = (Dog) myAnimal; // downcasting
myDog.bark(); // This will throw a ClassCastException in runtime
~~~

## `instanceof` Operator
The `instanceof` operator can be used to check if an object is an instance of a specific class or its subclasses.

### Example
~~~java
Animal myAnimal = new Dog();
if (myAnimal instanceof Dog) {
    System.out.println("myAnimal is an instance of Dog");
}

// output: myAnimal is an instance of Dog

if (myAnimal instanceof Animal) {
    System.out.println("myAnimal is an instance of Animal");
}

// output: myAnimal is an instance of Animal
~~~


