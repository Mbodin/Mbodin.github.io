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
	// TODO
}

inline GETHUNGRY(p)
{
	// TODO
}

inline EAT(p)
{
	// TODO
}

/*input: f is an index of a fork
After TAKE(f), the fork of index f is taken
*/
inline TAKE(f)
{
	// TODO
}
inline FREE(f)
{
	// TODO
}




/* Definition of the processes. One process is one philosopher. */
active [PHILO_NUMBER] proctype Philosopher()
{
	// TODO
}


ltl happyPhilosophers { /* TODO */ }

