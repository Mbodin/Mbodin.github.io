
Section Arithmetic.

(* Dichotomic research on array of [Z]. *)

Check Z.
Check Zdiv.

Variable Array : Type -> Z -> Type.
Variable Array_read : forall A n, Array A n -> Z -> maybe A.
Hypothesis Array_read_ok : forall A n m (a : Array A n),
  m < n -> is_defined _ (Array_read _ _ a m) = true.

Check Array_read_ok.


Inductive state : Type :=
  | state_cons : forall n,
    Z (* goal *) -> Array Z n -> Z (* min *) -> Z (* max *) -> state.


Definition is_final (s : state) : Prop :=
  match s with
  | state_cons _ _ a min max =>
    (* ... *)
  end.

Definition next (s : state) : maybe state :=
  match s with
  | state_cons _ goal a min max =>
    (* ... *)
  end.


Lemma always_in_bounds : forall n goal (a : Array Z n) min max s,
  min < n -> max < n ->
  s = state_cons _ goal a min max ->
  ~ is_final s ->
  exists min' max',
  min' < n /\ max' < n /\
  next s =
    defined _ (state_cons _ goal a min' max').
Proof.
    (* ... *)
Qed.

Print always_in_bounds.

End Arithmetic.

