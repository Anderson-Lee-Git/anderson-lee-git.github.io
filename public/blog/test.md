Testing
==============

**Date:** *04/01/2025*

**Author:** *Anderson Lee*

# Types of Testing
1. By transparency: 
    * White-box testing: Testing based on looking into the implementation details.
    * Black-box testing: Testing based on the specification of the method/program.
2. By purpose:
    * Unit test: Testing individual units of the program.
    * Integration test: Testing the interaction between units.
    * End-to-end test: Testing the program as a whole.

# Unit Test
Unit test should only test one **unit** of the program. It should be independent and self-contained with the use of *mock* resources to setup the environment. Ideally, it should only test the target **unit** (e.g. method) and not the other units. However, it is not always possible because some units might require using other units to simulate the real environment.

> Mock is a resource that simulates the behavior of the real resource. For example, we can use a *mock* `File` object to simulate the file that we want to read from or write to.

## Write a (black-box) unit test
1. Split the specification input space into subdomains
2. For each subdomain, select an input
3. For each input, **think through** the unit to get the expected output
4. Write an assertion to verify the expected output you thought through

## Example
Let's say we have a method called `isPositiveAndEven` that returns `true` if the input is a positive even number.
~~~java
// returns true if the input is positive and even
public boolean isPositiveAndEven(int number) {
    return number > 0 && number % 2 == 0;
}
~~~
The subdomains of the input space are:
* Positive number and even number
* Positive number and odd number
* Negative number and even number
* Negative number and odd number
* Zero

For each subdomain, we can select an input and write an assertion to verify the expected output corresponding to each case.
~~~java
@Test
public void testIsPositiveAndEven() {
    assertTrue(isPositiveAndEven(2));
    assertFalse(isPositiveAndEven(3));
    assertFalse(isPositiveAndEven(-2));
    assertFalse(isPositiveAndEven(-3));
    assertFalse(isPositiveAndEven(0));
}
~~~

## Frameworks
In `Java`, there are a few frameworks that can be used to write unit tests. Each offers similar features but with different syntax. One popular option is `JUnit`. It offers annotations like `@Test` to identify the test methods, `assertEquals` and other assertions to verify the expected output, and setup methods like `@BeforeEach` to initialize the test environment.

## Example
Below is an example of `JUnit 5`.
~~~java
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    private Calculator calculator;

    @BeforeAll
    static void setupBeforeAll() {
        System.out.println("Executing @BeforeAll: Runs once before all tests.");
    }

    @BeforeEach
    void setupBeforeEach() {
        calculator = new Calculator();
        System.out.println("Executing @BeforeEach: Runs before each test.");
    }

    @Test
    void testAddition() {
        assertEquals(5, calculator.add(2, 3), "2 + 3 should be 5");
    }

    @Test
    void testSubtraction() {
        assertEquals(1, calculator.subtract(5, 4), "5 - 4 should be 1");
    }

    @Test
    void testMultiplication() {
        assertEquals(6, calculator.multiply(2, 3), "2 * 3 should be 6");
    }

    @Test
    void testDivision() {
        assertEquals(2, calculator.divide(6, 3), "6 / 3 should be 2");
    }

    @Test
    void testDivisionByZero() {
        Exception exception = assertThrows(ArithmeticException.class, () -> calculator.divide(5, 0));
        assertEquals("Cannot divide by zero", exception.getMessage());
    }
}
~~~
