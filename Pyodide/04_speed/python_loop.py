import time
start_time = time.time()
total = 0
for i in range(1, 1000001):
    total += i
end_time = time.time()
print(f"Native Python: {total} in {end_time - start_time:.6f} seconds")

#Ctrl + Shift + P  ->  Run Python File in Terminal