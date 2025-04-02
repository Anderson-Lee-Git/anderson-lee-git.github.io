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
4. **is-a** Relationship
5. `instanceof` Operator
6. Upcasting and Downcasting
7. Access **inherited** fields
8. **Overriding** Methods
    * Overriding vs. Overloading
9. The `super` Keyword
10. The `Object` Class
11. **Polymorphism**

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

## **is-a** Relationship
When do we need this **is-a** relationship? There are three places you need to consider when it comes to the **is-a** relationship:

1. Declaration/Instantiation: the initiated object **is-a** `declared` type
2. Return type: the method returns an object that **is-a** `declared return` type
3. Argument/parameter type: the method argument **is-a** `declared parameter` type

### Declaration/Instantiation Example
~~~java
// declaration/instantiation: the `declared` type is `Animal`, the initiated object is `Dog` type
Animal myAnimal = new Dog();
// invalid example for declaration:
// the `declared` type is `Dog`, the initiated object is `Animal` type; `Animal` is not a `Dog`
Dog myDog = new Animal();
~~~

### Return Type Example
~~~java
// return type: the method returns an object that **is-a** `declared return` type
public static Animal getAnimal() {
    return new Dog();
}
// invalid example for return type: 
// the `declared return` type is `Dog`, but the returned object is `Animal` type; `Animal` is not a `Dog`
public static Dog getDog() {
    return new Animal();
}
~~~ 

### Argument/parameter Type Example
~~~java
// argument/parameter type: the method argument **is-a** `declared parameter` type
public static void printAnimal(Animal animal) {
    System.out.println(animal.name);
}
printAnimal(new Dog()); // valid
// invalid example for argument/parameter type:
// the `declared parameter` type is `Dog`, but the argument is `Animal` type; `Animal` is not a `Dog`
public static void printDog(Dog dog) {
    System.out.println(dog.name);
}
printDog(new Animal()); // invalid because `Animal` is not a `Dog`
~~~

## `instanceof` Operator
The `instanceof` operator can be used to check if an object is an instance of a specific class or its subclasses.

### Example
~~~java
Animal myAnimal = new Dog();
if (myAnimal instanceof Dog) {
    System.out.println("myAnimal is an instance of Dog");
} else {
    System.out.println("myAnimal is not an instance of Dog");
}
// output: myAnimal is an instance of Dog
if (myAnimal instanceof Animal) {
    System.out.println("myAnimal is an instance of Animal");
}
// output: myAnimal is an instance of Animal

Animal myAnimal2 = new Animal();
if (myAnimal2 instanceof Dog) {
    System.out.println("myAnimal2 is an instance of Dog");
} else {
    System.out.println("myAnimal2 is not an instance of Dog");
}
// output: myAnimal2 is not an instance of Dog
~~~


