
Section Basics.

Inductive maybe (A : Type) : Type :=
  | defined : A -> maybe A
  | undefined : maybe A.

Check maybe.
Print maybe.
Check maybe_ind.

Variables A B : Type.

Definition maybe_apply (f : A -> B) (ma : maybe A) : maybe B :=
  match ma with
  | defined a => defined _ (f a)
  | undefined => undefined B
  end.

Print bool.

Definition is_defined (ma : maybe A) : bool :=
  match ma with
  | defined _ => true
  | undefined => false
  end.

Lemma bool_elim : forall (b : bool),
  b = true \/ b = false.
Proof.
  intro b. destruct b as [ | ].
   left. reflexivity.
   right. reflexivity.
Qed.

Print bool_elim.

Lemma true_neq_false : ~ false = true.
Proof.
  discriminate.
Qed.

Lemma is_defined_exists_defined : forall (ma : maybe A),
  is_defined ma = true -> exists (a : A),
  ma = defined A a.
Proof.
  intros ma E. destruct ma as [a | ].
   exists a. reflexivity.
   simpl in E. apply true_neq_false in E. destruct E.
Qed.

Lemma equal_defined_is_defined : forall (ma : maybe A) a,
  ma = defined _ a -> is_defined ma = true.
Proof.
  intros ma a E. rewrite E.
  simpl. reflexivity.
Qed.

End Basics.

Check maybe_apply.

