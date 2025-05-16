import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  const mockCartItems = [
    { id: 1, name: 'Burger', price: 100, quantity: 2 },
    { id: 2, name: 'Fries', price: 50, quantity: 1 },
  ];

  beforeEach(() => {
    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'cartItems') {
        return JSON.stringify(mockCartItems);
      }
      return null;
    });

    spyOn(localStorage, 'setItem').and.stub();

    TestBed.configureTestingModule({
      declarations: [CartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load cartItems from localStorage', () => {
    expect(component.cartItems.length).toBe(2);
    expect(component.cartItems[0].name).toBe('Burger');
  });

  it('should correctly calculate subtotal and total', () => {
    // subtotal = (100*2 + 50*1) = 250
    expect(component.subtotal).toBe(250);
    expect(component.total).toBe(250); // discount is 0
  });

  it('should increase quantity and update cart', () => {
    const item = component.cartItems[0];
    component.increaseQty(item);
    expect(item.quantity).toBe(3);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(component.subtotal).toBe(350); // (100 * 3 + 50)
  });

  it('should decrease quantity and update cart', () => {
    const item = component.cartItems[0]; // quantity 3 now
    component.decreaseQty(item);
    expect(item.quantity).toBe(2);
    expect(component.subtotal).toBe(250);
  });

  it('should remove item if quantity becomes 0 on decrease', () => {
    const item = component.cartItems[1]; // quantity = 1
    component.decreaseQty(item);
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems.find((i) => i.id === 2)).toBeUndefined();
  });

  it('should remove item from cart when removeItem is called', () => {
    component.removeItem({ id: 1 });
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems.find((i) => i.id === 1)).toBeUndefined();
  });

  it('should log correct data on buyNow()', () => {
    spyOn(console, 'log');
    component.buyNow();
    expect(console.log).toHaveBeenCalledWith('Cart Data:', component.cartItems);
    expect(console.log).toHaveBeenCalledWith('Subtotal:', component.subtotal);
    expect(console.log).toHaveBeenCalledWith('Discount:', component.discount);
    expect(console.log).toHaveBeenCalledWith('Total:', component.total);
  });
});
