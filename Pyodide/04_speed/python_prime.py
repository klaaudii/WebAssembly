import time
import math
start_time = time.time()
is_prime_bool = False
def is_prime(n):
    global is_prime_bool
    for i in range(2,int(math.sqrt(n))+1):
        if (n%i) == 0:
            return
    is_prime_bool = True
is_prime(999998727899999)
end_time = time.time()
print(f"Native Python: {is_prime_bool} in {end_time - start_time:.6f} seconds")