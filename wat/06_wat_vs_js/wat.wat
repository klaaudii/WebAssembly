(module
  (func $sum (export "sum") (result i32)
    (local $i i32)
    (local $sum i32)
    (local.set $sum (i32.const 0))
    (local.set  $i (i32.const 1))
    (loop $loop (block $break
      (br_if $break (i32.gt_u (local.get $i) (i32.const 10000)))
      (local.set $sum (i32.add (local.get $sum) (local.get $i)))
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      br $loop
    ))
    local.get $sum
  )
)