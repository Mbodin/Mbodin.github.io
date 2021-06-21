#define PHILO_NUMBER 5
#define AVAILABLE_FORK 1
#define USED_FORK 0


bool forks[PHILO_NUMBER] = AVAILABLE_FORK;


/*
if p is a index of a philosopher (or fork)
LEFT_FORK(p) is the index of the fork that is at the left of p
RIGHT_FORK(p) is the index of the fork that is at the right of p


*/

#define LEFT_FORK(p) p


#define RIGHT_FORK(p) ((p == (PHILO_NUMBER-1)) -> 0 : p+1) //syntax: test -> value if test true : value if test false

/* Possible states of a philosopher */
#define STATE_THINK -1
#define STATE_HUNGRY 0
#define STATE_EAT 1

/*Global state (each philosopher has a state initialized to STATE_THINK)*/
int state[PHILO_NUMBER] = STATE_THINK;

inline THINK(p)
{
	state[p] = STATE_THINK
}

inline GETHUNGRY(p)
{
	state[p] = STATE_HUNGRY
}

inline EAT(p)
{
	state[p] = STATE_EAT
}

/*input: f is an index of a fork
After TAKE(f), the fork of index f is taken
*/
inline TAKE(f)
{
	atomic {
		forks[f] == AVAILABLE_FORK;
		forks[f] = USED_FORK;
	 } 
}
inline FREE(f)
{
	forks[f] = AVAILABLE_FORK;
}




/* Definition of the processes. One process is one philosopher. */
active [PHILO_NUMBER] proctype Philosopher()
{ 
	int leftFork = LEFT_FORK(_pid);
	int rightFork = RIGHT_FORK(_pid);
	do :: true ->
		THINK(_pid);
		GETHUNGRY(_pid);
		TAKE(rightFork);
		TAKE(leftFork);
		EAT(_pid);
		FREE(rightFork);
		FREE(leftFork)
	od
}


ltl happy {((state[0] == STATE_HUNGRY) -> [](state[0] == STATE_THINK))}


