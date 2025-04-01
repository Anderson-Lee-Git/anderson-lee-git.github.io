Getter & Setter Pattern
==============

**Date:** *03/11/2025*

**Author:** *Anderson Lee*

# Overview
In the design of a class, there are usually attributes/fields that this class would like to save. For instance, a class of `Purchase` to record a specific purchase a person has made might have fields like `itemName`, `price`, or `quantity`. For the client/user of this class, it's convenient to access and edit these fields if they would like to use it for other purposes. For example, a user might want to sum up the total amount spent during a day by aggregating all `Purchase` records for that day and summing up the `price * quantity`. This operation requires the user to be able to **get** the `price` and `quantity`. As another example, when the user enters the wrong `price` to construct the `Purchase` record, it's more preferable for the user to directly **edit** the `price` than constructing a new `Purchase` with the correct `price`. This **edit** operation requires the user to be able to **set** the `price` of the `Purchase`.

# Motivation
Now that we would like to allow both **get** and **set** operations for a class' fields, why don't we just declare these fields as `public` and let the user handle it directly like the following code snippet?
~~~java
Purchase mealPurchase = new Purchase(itemName: "meal", price: 12.0, quantity: 1.0);
// edit price
mealPurchase.price = 13.0;
// get quantity
System.out.println(mealPurchase.quantity);
~~~

While there are several concerns with this, a few can be listed here:
1. **Field values are no longer controllable** -- When the user is given this level of access, we can no longer guarantee the field values to be reasonable. For instance, the `quantity` is not supposed to be negative or zero. However, we don't have a gateway to prevent from the user to set the `quantity` to be negative.
2. **No read-only or write-only fields** -- Without `getter/setter` pattern, fields can only be accessed through `purchase.[field_name]` which directly allows read/write at the same time.
3. **Limited flexibility** -- Imagine a situation where you updated your fields' naming or changed the way certain values are stored. Without the `getter/setter` pattern, the user has to change their client-side code to adopt the changes you made on the class design. However, with `getter/setter` pattern, you'll be able to encapsulate the changes within the `getter` or `setter` such that the user is still calling the same interface.

# Getter
The `getter` allows the user to access the field. By convention, this access should not allow any **write** access. In other words, when the user gets a value from the `getter`, any attempt to modify this value doesn't impact the class' field value.

## Simple Case
~~~java
public class Purchase() {
    private String itemName;
    private float price;
    private float quantity;

    // ... constructor

    // simply returns the price field
    public float getPrice() {
        return this.price;
    }
}
~~~

## Reference-semantic Case
When the field is passed by reference (*reference-semantics*) and **mutable**, it's important to *hide* the write access when returning the value.
~~~java
public class Purchase {
    private String itemName;
    private float price;
    private float quantity;
    private List<String> sharedWith;  // list of people this purchase is shared with

    // ... constructor

    // Implementation 1: Not preferred
    public List<String> getSharedWith() {
        return this.sharedWith;
    }

    // Implementation 2: Correct
    public List<String> getSharedWith() {
        return new ArrayList<>(this.sharedWith);
    }
}
~~~
Implementation 1 is not preferred because `List` is a mutable object and passed by reference. Therefore, when you return `this.sharedWith` to the user, the user gets the exact same `List` which has unrestricted write access. Implementation 2 essentially copies the same `List` while this time the user cannot modify the `List` that `this.sharedWith` points at.

## Data hiding case
The implementation of a class doesn't have to align with what the user thinks. Let's say we implement a class `Person` where the `Person` has to enter their full name. However, this class often requires using either the first name or last name to do a lot of processing, such as whether a person is related to another by their last names. To avoid repetition of splitting the full name into first name or last name multiple times in each method, we can choose to store `firstName` and `lastName` instead of the `fullName` the user inputs. This implementation will not impact the user's access to the full name when they ask for it through a getter as the following.
~~~java
public class Person {
    private String firstName;
    private String lastName;

    public Person(String fullName) {
        // set firstName and lastName by splitting fullName
        String[] tokens = fullName.split(" ");
        this.firstName = tokens[0];
        this.lastName = tokens[1];
    }

    // getter
    public String getName() {
        return this.firstName + " " + this.lastName;
    }
}
~~~

# Setter
The `setter` allows the user to edit the field value in a controllable manner. The main point is to protect unrestricted or undesirable value for a class' fields.

## Simple Case
~~~java
public class Purchase() {
    private String itemName;
    private float price;
    private float quantity;

    // ... constructor

    // simply returns the price field
    public void setPrice(float price) {
        // Check if price is negative or zero
        if (price <= 0) {
            throw new IllegalArgumentException("Price cannot be less than or equal to zero");
        }
        this.price = price;
    }
}
~~~

## Reference-semantic Case
When the field is passed by reference (*reference-semantics*) and **mutable**, it's important to *hide* the write access when returning the value.
~~~java
public class Purchase {
    private String itemName;
    private float price;
    private float quantity;
    private List<String> sharedWith;  // list of people this purchase is shared with

    // ... constructor

    // Implementation 1: Not preferred
    public void setSharedWith(List<String> sharedWith) {
        this.sharedWith = sharedWith;
    }

    // Implementation 2: Correct
    public void setSharedWith() {
        this.sharedWith = new ArrayList<>(sharedWith);
    }
}
~~~
Implementation 1 is not preferred because `List` is a mutable object and passed by reference. Therefore, when you set `this.sharedWith` to the exact same `List` passed in by the user, the user still has control over the `List` which will let the user modify it without any restriction. The user can change the field by the following:
~~~java
Purchase mealPurchase = new Purchase(....);
List<String> newSharedWith = Arrays.asList("Bob", "John");
purchase.setSharedWith(newSharedWith);  // at this point, mealPurchase.sharedWith is changed to newSharedWith
// user's modification on newSharedWith
newSharedWith.add("May");
~~~
In implementation 1, `mealPurchase.sharedWith` will be changed unintentionally with the addition of `May`.